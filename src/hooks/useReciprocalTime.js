import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { ref, reactive, onUnmounted, computed } from 'vue'
import { useIntervalFn } from '@vueuse/core'

dayjs.extend(duration)

// 基数函数 => 这里我最多支持到 '天' 这个计量单位
const baseMillisecond = () => {
	const seconds = 1000
	const minutes = seconds * 60
	const hours = minutes * 60
	const days = hours * 24
	const weeks = days * 7
	return {
		seconds,
		minutes,
		hours,
		days,
		weeks,
	}
}

/**
 * 倒计时函数(默认每秒触发)
 * @returns
 */
export const useReciprocalTime = (time) => {
	const base = baseMillisecond()
	const suffix = ref('')
	const timer = ref(time)
	const zh_time = computed(() => dayjs.duration(timer.value * base.seconds).format(suffix.value))

	const { pause, resume } = useIntervalFn(
		() => {
			--timer.value
			if (timer.value <= 0) {
				pause()
			}
		},
		base.seconds,
		false
	)

	/**
	 * 开始执行倒计时函数
	 * @param {Number} defineTime -- 描述
	 */
	const start = () => {
		const ms = timer.value * base.seconds
		if (ms <= base.minutes) {
			suffix.value = 'ss秒'
		} else if (ms <= base.hours) {
			suffix.value = 'mm分ss秒'
		} else if (ms <= base.days) {
			suffix.value = 'HH时mm分ss秒'
		} else if (ms <= base.weeks) {
			suffix.value = 'DD天HH时mm分ss秒'
		} else {
			throw new Error('超出最大计量单位(7天)')
		}
		resume()
	}

	onUnmounted(() => {
		pause()
	})

	return reactive({
		start,
		zh_time,
	})
}
