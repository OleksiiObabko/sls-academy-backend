module.exports = {
	present: (userData) => {
		const {id, email} = userData;

		return {
			success: true,
			data: {
				id,
				email,
			},
		};
	},
};
