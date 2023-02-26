try {
	const prompt = "Parse the resume and fill the following JSON schema. Resume pages start by [PAGE] and end by [/PAGE].Return MAX 5 items per array. Only return the filled JSON inside a code block.";
	chrome.runtime.onMessage.addListener(function (message: any, sender: any, sendResponse: any) {
		// get the textarea element
		const textarea = document.querySelector('textarea');
		if (!textarea) return;

		// find the button next to the textarea
		const button = textarea.nextElementSibling as HTMLButtonElement;

		const resume = message.resumes[0];
		const schema = message.schema;


		// set the value of the textarea
		textarea.value = `${prompt}\nSCHEMA: ${JSON.stringify(schema, null, 2)}\nRESUME : ${resume}`;

		// fit the textarea to the content
		textarea.style.height = 'auto';
		textarea.style.height = textarea.scrollHeight + 'px';

		// click the button
		if (!button) return;
		button.click();
	});
} catch (e) {
	console.error(e);
}
