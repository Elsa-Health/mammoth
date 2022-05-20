import React from "react";

const QRScanner = jest.fn().mockImplementation(({ onRead, ...other }) => {
	// mock login working
	onRead({ data: "data" });
	return <></>;
});

export default QRScanner;
