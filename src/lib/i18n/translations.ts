export type Language = 'fa' | 'en';

export interface Translations {
	// Navigation
	nav: {
		home: string;
		wall: string;
		create: string;
		threads: string;
		settings: string;
		about: string;
	};
	// Hero
	hero: {
		title: string;
		subtitle: string;
		inMemoryOf: string;
		soulsLost: string;
		lightCandle: string;
		viewWall: string;
	};
	// Memorial
	memorial: {
		lightCandle: string;
		leaveFlower: string;
		candles: string;
		flowers: string;
		share: string;
		age: string;
		location: string;
		circumstances: string;
		relatedMemorials: string;
	};
	// Wall
	wall: {
		title: string;
		search: string;
		searchPlaceholder: string;
		noResults: string;
		loading: string;
		livesRemembered: string;
		candlesLit: string;
		globalVisitors: string;
	};
	// Create
	create: {
		title: string;
		photoLabel: string;
		photoHint: string;
		namePersian: string;
		nameLatin: string;
		age: string;
		dateOfDeath: string;
		location: string;
		circumstances: string;
		submit: string;
		submitting: string;
		success: string;
	};
	// Settings
	settings: {
		title: string;
		language: string;
		mode: string;
		modeInside: string;
		modeOutside: string;
		panicButton: string;
		panicUrl: string;
		clearCache: string;
		cacheSize: string;
		version: string;
	};
	// Security
	security: {
		torConnected: string;
		torDisconnected: string;
		warning: string;
		warningIranIp: string;
		useTor: string;
		panicTriggered: string;
	};
	// Common
	common: {
		loading: string;
		error: string;
		retry: string;
		close: string;
		offline: string;
		online: string;
	};
	// Footer
	footer: {
		builtWithLove: string;
		noTracking: string;
	};
}

export const translations: Record<Language, Translations> = {
	fa: {
		nav: {
			home: 'خانه',
			wall: 'دیوار یادبود',
			create: 'افزودن یادبود',
			threads: 'گفتگوها',
			settings: 'تنظیمات',
			about: 'درباره'
		},
		hero: {
			title: 'زن، زندگی، آزادی',
			subtitle: 'Woman, Life, Freedom',
			inMemoryOf: 'به یاد',
			soulsLost: 'جان باخته در خیزش',
			lightCandle: 'روشن کردن شمع',
			viewWall: 'دیدن دیوار یادبود'
		},
		memorial: {
			lightCandle: 'روشن کردن شمع',
			leaveFlower: 'گذاشتن گل',
			candles: 'شمع',
			flowers: 'گل',
			share: 'اشتراک‌گذاری',
			age: 'سن',
			location: 'محل',
			circumstances: 'شرایط',
			relatedMemorials: 'یادبودهای مرتبط'
		},
		wall: {
			title: 'دیوار یادبود',
			search: 'جستجو',
			searchPlaceholder: 'جستجوی نام، شهر...',
			noResults: 'نتیجه‌ای یافت نشد',
			loading: 'در حال بارگذاری...',
			livesRemembered: 'زندگی به یاد مانده',
			candlesLit: 'شمع روشن شده',
			globalVisitors: 'بازدیدکننده جهانی'
		},
		create: {
			title: 'افزودن یادبود',
			photoLabel: 'عکس',
			photoHint: 'عکس با روبان سیاه اضافه می‌شود',
			namePersian: 'نام (فارسی)',
			nameLatin: 'نام (انگلیسی)',
			age: 'سن',
			dateOfDeath: 'تاریخ شهادت',
			location: 'شهر/استان',
			circumstances: 'شرایط',
			submit: 'ثبت یادبود',
			submitting: 'در حال ثبت...',
			success: 'یادبود با موفقیت ثبت شد'
		},
		settings: {
			title: 'تنظیمات',
			language: 'زبان',
			mode: 'حالت',
			modeInside: 'داخل ایران',
			modeOutside: 'خارج از ایران',
			panicButton: 'دکمه اضطراری',
			panicUrl: 'آدرس امن',
			clearCache: 'پاک کردن حافظه',
			cacheSize: 'حجم حافظه',
			version: 'نسخه'
		},
		security: {
			torConnected: 'متصل به Tor',
			torDisconnected: 'بدون Tor',
			warning: 'هشدار',
			warningIranIp: 'به نظر می‌رسد از ایران متصل شده‌اید. لطفاً از Tor استفاده کنید.',
			useTor: 'استفاده از Tor',
			panicTriggered: 'خروج اضطراری'
		},
		common: {
			loading: 'در حال بارگذاری...',
			error: 'خطا',
			retry: 'تلاش مجدد',
			close: 'بستن',
			offline: 'آفلاین',
			online: 'آنلاین'
		},
		footer: {
			builtWithLove: 'ساخته شده با عشق برای ایران',
			noTracking: 'بدون ردیابی. بدون ثبت. صدای شما مهم است.'
		}
	},
	en: {
		nav: {
			home: 'Home',
			wall: 'Memorial Wall',
			create: 'Add Memorial',
			threads: 'Threads',
			settings: 'Settings',
			about: 'About'
		},
		hero: {
			title: 'Woman, Life, Freedom',
			subtitle: 'زن، زندگی، آزادی',
			inMemoryOf: 'In memory of',
			soulsLost: 'souls lost in the uprising',
			lightCandle: 'Light a Candle',
			viewWall: 'View Memorial Wall'
		},
		memorial: {
			lightCandle: 'Light a Candle',
			leaveFlower: 'Leave a Flower',
			candles: 'candles',
			flowers: 'flowers',
			share: 'Share',
			age: 'Age',
			location: 'Location',
			circumstances: 'Circumstances',
			relatedMemorials: 'Related Memorials'
		},
		wall: {
			title: 'Memorial Wall',
			search: 'Search',
			searchPlaceholder: 'Search by name, city...',
			noResults: 'No results found',
			loading: 'Loading...',
			livesRemembered: 'Lives Remembered',
			candlesLit: 'Candles Lit',
			globalVisitors: 'Global Visitors'
		},
		create: {
			title: 'Add Memorial',
			photoLabel: 'Photo',
			photoHint: 'Black ribbon will be added automatically',
			namePersian: 'Name (Persian)',
			nameLatin: 'Name (English)',
			age: 'Age',
			dateOfDeath: 'Date of Death',
			location: 'City/Province',
			circumstances: 'Circumstances',
			submit: 'Submit Memorial',
			submitting: 'Submitting...',
			success: 'Memorial submitted successfully'
		},
		settings: {
			title: 'Settings',
			language: 'Language',
			mode: 'Mode',
			modeInside: 'Inside Iran',
			modeOutside: 'Outside Iran',
			panicButton: 'Panic Button',
			panicUrl: 'Safe URL',
			clearCache: 'Clear Cache',
			cacheSize: 'Cache Size',
			version: 'Version'
		},
		security: {
			torConnected: 'Connected via Tor',
			torDisconnected: 'Not using Tor',
			warning: 'Warning',
			warningIranIp: 'You appear to be connecting from Iran. Please use Tor for safety.',
			useTor: 'Use Tor',
			panicTriggered: 'Emergency Exit'
		},
		common: {
			loading: 'Loading...',
			error: 'Error',
			retry: 'Retry',
			close: 'Close',
			offline: 'Offline',
			online: 'Online'
		},
		footer: {
			builtWithLove: 'Built with love for Iran',
			noTracking: 'No tracking. No logs. Your voice matters.'
		}
	}
};
