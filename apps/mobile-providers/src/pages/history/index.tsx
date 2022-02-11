import { useNavigation } from "@react-navigation/core";
import { CommonActions, StackActions } from "@react-navigation/native";
import React from "react";
import { Platform, TouchableHighlight, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AssessmentRecord } from "../../../@types";
import {
  SavedPatientAssessmentRecord,
  useMainState,
} from "../../app/context/main";
import { useSypmtomLocale } from "../../app/symptoms";
import { properAgeString } from "../../app/utils";
import { Layout, Text } from "../../components";
import { Button } from "../../components/input";
import { RevealContent } from "../../components/misc";
import * as datafns from "../../app/libs/data-fns";

const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
dayjs.locale("sw");

export function MiniBars({
  conditions,
  decisionKey,
}: {
  conditions: Array<{ condition: string; p: number }>;
  decisionKey: string;
}) {
  return (
    <View style={{ marginVertical: 8 }}>
      {conditions.map((c, ix) => (
        <View
          key={`${c}-${ix}`}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            minHeight: 30,
          }}
        >
          <Text
            font={decisionKey === c.condition ? "bold" : "normal"}
            style={{ flex: 1, flexWrap: "wrap-reverse", paddingHorizontal: 5 }}
          >
            {c.condition}
          </Text>
          {/* graph border */}
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.3)",
              height: 5,
              marginHorizontal: 5,
            }}
          >
            <View
              style={{
                width: `${(c.p * 100).toFixed(2)}%`,
                backgroundColor: "rgba(0,0,0,1)",
                flex: 1,
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

export function AssessmentRecordItem({
  record: ar,
  separators,
}: {
  record: SavedPatientAssessmentRecord;
  separators: { highlight: any; unhighlight: any };
}) {
  // constuct proper
  const ageString = React.useMemo(() => properAgeString(ar.patient.age), [ar]);
  const { getSymptomById: getName } = useSypmtomLocale();
  const elsaDiagnosis = ar.assessmentInfo.elsaConditions;

  return (
    <TouchableHighlight
      style={{ paddingVertical: 6, paddingHorizontal: 16 }}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}
    >
      <React.Fragment>
        {/* header info */}
        <View>
          <Text font="medium" style={{ fontSize: 10 }}>
            ID: {ar.id.toString().toUpperCase()}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ marginVertical: 8 }}>
            <Text>
              {ar.patient.sex === "male" ? "Male" : "Female"}, {ageString}
            </Text>
            <RevealContent
              show={ar.assessmentInfo.presentingSymptoms.length > 0}
              style={{ margin: 8 }}
            >
              <Text font="medium" style={{ fontSize: 12 }}>
                Presenting Symptoms
              </Text>
              <Text style={{ textTransform: "capitalize" }}>
                {ar.assessmentInfo.presentingSymptoms
                  .map((s) => getName(s.id)?.symptom)
                  .join(", ")}
              </Text>
            </RevealContent>
            <RevealContent
              show={ar.assessmentInfo.absentSymptoms.length > 0}
              style={{ margin: 8 }}
            >
              <Text font="medium" style={{ fontSize: 12 }}>
                Absent Symptoms
              </Text>
              <Text style={{ textTransform: "capitalize" }}>
                {ar.assessmentInfo.absentSymptoms
                  .map((s) => getName(s.id)?.symptom)
                  .join(", ")}
              </Text>
            </RevealContent>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                font="medium"
                style={{ textTransform: "uppercase", fontSize: 12 }}
              >
                Your decision
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  flexWrap: "wrap",
                }}
              >
                {ar.assessmentInfo.userConditions.map((diagnosis) => {
                  return (
                    <Text
                      key={diagnosis}
                      font="bold"
                      style={{ marginTop: 6, marginHorizontal: 6 }}
                    >
                      {datafns.conditions.name.fromId(diagnosis)}
                    </Text>
                  );
                })}
              </View>
            </View>
            <RevealContent
              show={elsaDiagnosis !== undefined && elsaDiagnosis.length > 0}
              style={{ flex: 1, marginTop: 10 }}
            >
              <Text
                font="medium"
                style={{ textTransform: "uppercase", fontSize: 12 }}
              >
                Elsa's diagnosis
              </Text>
              {/* <Text>{JSON.stringify(ar.diagnosis.elsa.map(s => s.))}</Text> */}
              <MiniBars conditions={(elsaDiagnosis || []).slice(0, 3)} />
            </RevealContent>
          </View>
          <RevealContent show={true}></RevealContent>
        </View>
        <View>
          <Text font="medium" style={{ fontSize: 14, color: "#555" }}>
            Completed {dayjs().to(ar.dateTime)}
          </Text>
        </View>
      </React.Fragment>
    </TouchableHighlight>
  );
}

export default function HistoryView() {
  const navigation = useNavigation();
  const { records: assessments } = useMainState();

  return (
    <Layout title="Assessment history" style={{ paddingHorizontal: 0 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={assessments}
          ItemSeparatorComponent={({ highlighted }) => (
            <View
              style={[
                {
                  borderColor: "#CCC",
                  borderBottomWidth: 1,
                  marginVertical: 14,
                },
                highlighted && { marginLeft: 0 },
              ]}
            />
          )}
          renderItem={({ item, separators }) => (
            <AssessmentRecordItem record={item} separators={separators} />
          )}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
        <Button
          title="Go home"
          style={{ alignSelf: "flex-start" }}
          outline
          type="secondary"
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "app.home" }],
              })
            );
          }}
        />
        <Button
          title="New Assessment"
          style={{
            alignSelf: "flex-start",
            borderRadius: 50,
            marginVertical: 5,
          }}
          type="secondary"
          onPress={() => {
            navigation.navigate("app.core", {
              screen: "intake",
              initial: true,
            });
          }}
        />
      </View>
    </Layout>
  );
}
