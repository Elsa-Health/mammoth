import React, { useState } from 'react';
import { Heading, Layout, Text } from './components';
import { Pressable, View, FlatList, ViewProps, Modal, StyleSheet } from 'react-native'
import { Button, TextInput, VariableTextInput, MultiInput } from './components/input';
import { Chip, SelectableChip } from './components/misc'

import SplashScreen from 'react-native-splash-screen'

function DonparItemOption ({ title, description, options }: { title: string, description: string, options: string[] }) {
    return (
        <View>
            <View>
                <Text>{title}</Text>
                <Text>{description}</Text>
            </View>
            <View>
                {
                    options.map(item => (
                        <SelectableChip key={item} text="item" onPress={() => console.log('item =>', item)} />
                    ))
                }
            </View>
        </View>
    )
}
function ItemPicker () {
    return (
        <View>
            <FlatList 
                data={[{ title: 'fever', description: 'Someting about duration', options: ['less-that-2-weeks', 'more-than-2-weeks'] }]}
                renderItem={({ item, index, separators }) => <DonparItemOption {...item} />}
            />
        </View>
    )
}

// temporary
export default function _TempAppComponents () {
    React.useEffect(() => {
        // Hide the splash screen after
        //  the page has loaded
        SplashScreen.hide()
    }, [])

    const [selectedItems, setSelectedItems] = useState([])
    return (
        <Layout>
            {/* Typography */}
            <View>
                <Heading>Heading</Heading>
                <Text>Normal Text</Text>
                <Text font='bold'>Bold Text</Text>
                <Text italic>Normal Italic Text</Text>
                <Text font='bold' italic>Bold Italic Text</Text>
            </View>

            {/* buttons */}
            <View>
                <Button title="Primary click me" onPress={() => console.log("Doing something!")} />
                <Button title="Secondary click me" type="secondary" onPress={() => console.log("Doing something!")} />
            </View>

            {/* Inputs */}
            <View>
                <Chip text="Something" onPress={() => console.log("pressed on chip")} />
                <Chip text="Something else" onPress={() => console.log("pressed on something else")} />
            </View>

            <View>
                <VariableTextInput
                    value={{ option: 'kg' }}
                    onChangeValue={(value) => console.log(value)}
                    options={[
                        { label: 'Kg', value: 'kg'},
                        { label: 'Pound', value: 'lb'},
                    ]}
                />
            </View>
            <View  style={{ flex: 1 }}>
                <MultiInput
                    title="Age"
                    configuration={{
                        'years': { show: true },
                    }}
                    fields={[
                        {  name: 'years', label: 'Years', component: (props) => <TextInput {...props} keyboardType="numeric" style={sty.numberText} /> },
                        {  name: 'months', label: 'Months', component: (props) => <TextInput {...props} keyboardType="numeric" style={sty.numberText} /> },
                    ]} />
            </View>
            <View>
                
            </View>
        </Layout>
    )
} 

const sty = {
    numberText: { 
        borderWidth: 0, 
        borderBottomWidth: 1, 
        fontSize: 18, 
        alignSelf: 'baseline', 
        width: '33%'
    }
}
