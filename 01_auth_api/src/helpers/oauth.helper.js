module.exports = {
    removeBearer: (header) => {
		 return header.replace("Bearer ", "")
	 },
}
