try {
	console.log('content script loaded');
	chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
		// get the textarea element
		const textarea = document.querySelector('textarea');

		// set the value of the textarea
		textarea.value = message.resumes[0];

		// fit the textarea to the content
		textarea.style.height = 'auto';
		textarea.style.height = textarea.scrollHeight + 'px';
	});
} catch (e) {
	console.error(e);
}
