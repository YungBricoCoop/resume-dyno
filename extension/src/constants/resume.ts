const resume = {

	DROP_ZONE: {
		accept: {
			"application/pdf": [".pdf", ".PDF"],
		},
		multiple: false,
	},
	SCHEMAS: [
		{
			label: "Default",
			schema: {
				firstname: "",
				lastname: "",
				email: "",
				phone: "",
				address: "",
			},
		},
		{
			label: "Work Experience",
			schema: {
				firstname: "",
				lastname: "",
				experience: [
					{
						jobt_itle: "",
						company: "",
						start_date: "",
						end_date: "",
						description: "",
					},
				],
			},
		},
		{
			label: "Personal Interests",
			schema: {
				firstname: "",
				lastname: "",
				interests: [""],
				skills: [""],
				languages: [""],
			},
		},
	]
}

export default resume