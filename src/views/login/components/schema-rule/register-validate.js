import { _userCheckAccount } from '@/api'

export const validateAccount = async (_rule, value) => {
	return new Promise((resolve, reject) => {
		if (value === '') {
			reject(new Error('请输入账号'))
		} else {
			if (!/^[a-zA-Z]\w{5,19}$/.test(value)) {
				reject(new Error('字母开头且6-20字符'))
			}
			_userCheckAccount(value).then((res) => {
				const { result } = res
				if (result.valid) {
					reject(new Error('用户名已存在'))
				} else {
					resolve()
				}
			})
		}
	})
}

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

export const validatePassword = async (_rule, value) => {
	return new Promise((resolve, reject) => {
		if (value === '') {
			reject(new Error('请输入密码'))
		} else {
			if (!/^\w{6,24}$/.test(value)) {
				reject(new Error('密码6-24字符'))
			}
			resolve()
		}
	})
}
