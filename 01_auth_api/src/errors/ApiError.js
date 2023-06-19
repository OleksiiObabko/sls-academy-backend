class ApiError extends Error {
	constructor(massage, status) {
		super(massage);
		this.status = status;
		this.success = false;
	}
}

module.exports = ApiError;
