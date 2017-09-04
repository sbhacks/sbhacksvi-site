import React from "react";

import { Button } from "semantic-ui-react";
import { isValidBasedOnTextFields, invalidResume  } from "../validApplication";

const ApplyButton = (fields) => {

	let btnProps = {
		color: "blue",
		fluid: true,
		size: "large"
	};
	
	if(!isValidBasedOnTextFields(fields) || invalidResume(fields.resume)) btnProps.disabled = true;

	return <Button {...btnProps}>Submit Application</Button>
};

export default ApplyButton;