export const validatePhone = async (_rule, value) => {
	return new Promise((resolve, reject) => {
		if (value === '') {
			reject(new Error('请输入手机号'))
		} else {
			if (!/^1[3-9]\d{9}$/.test(value)) {
				reject(new Error('11位有效手机号'))
			}
			resolve()
		}
	})
}

export const schemaPhone = (phone) => {
	return /^1[3-9]\d{9}$/.test(phone)
}

export const validateVerificationCode = async (_rule, value) => {
	return new Promise((resolve, reject) => {
		if (value === '') {
			reject(new Error('请输入验证码'))
		} else {
			if (!/^\d{6}$/.test(value)) {
				reject(new Error('请输入六位数字验证码!'))
			}
			resolve()
		}
	})
}
