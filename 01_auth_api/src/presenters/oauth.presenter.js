module.exports = {
	present: (tokenData) => {
		const {user_id, accessToken, refreshToken} = tokenData;

		return {
			success: true,
			data: {
				id: user_id,
				accessToken,
				refreshToken,
			},
		};
	},
};
