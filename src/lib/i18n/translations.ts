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
		namePersianPlaceholder: string;
		nameLatin: string;
		nameLatinPlaceholder: string;
		age: string;
		agePlaceholder: string;
		dateOfDeath: string;
		location: string;
		locationPlaceholder: string;
		circumstances: string;
		circumstancesPlaceholder: string;
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
	// About
	about: {
		title: string;
		whyThisSite: string;
		whyThisSiteText: string;
		protectingDignity: string;
		protectingDignityText: string;
		whatHappensElsewhere: string;
		whatHappensElsewhereText: string;
		howWeAreDifferent: string;
		howWeAreDifferentText: string;
		privacyFeatures: string;
		featureNoTracking: string;
		featureNoAds: string;
		featureNoAiTraining: string;
		featureEncrypted: string;
		featureTor: string;
		featureOffline: string;
		forFamilies: string;
		forFamiliesText: string;
		inTheirMemory: string;
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
			namePersianPlaceholder: 'نام کامل',
			nameLatin: 'نام (انگلیسی)',
			nameLatinPlaceholder: 'Full name in English',
			age: 'سن',
			agePlaceholder: 'سن',
			dateOfDeath: 'تاریخ شهادت',
			location: 'شهر/استان',
			locationPlaceholder: 'شهر یا استان',
			circumstances: 'شرایط',
			circumstancesPlaceholder: 'شرح شرایط شهادت (اختیاری)',
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
		},
		about: {
			title: 'درباره این یادبود',
			whyThisSite: 'چرا این سایت را ساختیم؟',
			whyThisSiteText: 'این سایت با یک هدف ساده ساخته شده است: یک مکان امن و باوقار برای یادآوری عزیزانی که در خیزش زن، زندگی، آزادی از دست دادیم. جایی که خانواده‌ها بتوانند بدون نگرانی، خاطرات عزیزانشان را به اشتراک بگذارند.',
			protectingDignity: 'حفظ حرمت عزیزان شما',
			protectingDignityText: 'وقتی عکس یا خاطره‌ای را در شبکه‌های اجتماعی مثل فیسبوک، اینستاگرام یا توییتر منتشر می‌کنید، این شرکت‌ها می‌توانند از آن‌ها برای آموزش هوش مصنوعی استفاده کنند. این یعنی چهره عزیز شما ممکن است روزی در جایی دیگر، با نام و داستانی کاملاً متفاوت ظاهر شود.',
			whatHappensElsewhere: 'در جاهای دیگر چه اتفاقی می‌افتد؟',
			whatHappensElsewhereText: 'شرکت‌های بزرگ فناوری از عکس‌ها و متن‌هایی که کاربران منتشر می‌کنند برای آموزش برنامه‌های هوش مصنوعی استفاده می‌کنند. تصور کنید چهره فرزند، همسر یا دوست شما در یک تصویر ساخته شده توسط هوش مصنوعی با هویتی کاملاً جعلی ظاهر شود. این بی‌احترامی به خاطره عزیزان شماست.',
			howWeAreDifferent: 'ما چه فرقی داریم؟',
			howWeAreDifferentText: 'ما هیچ‌وقت از عکس‌ها یا خاطرات شما برای هوش مصنوعی استفاده نمی‌کنیم. هیچ شرکتی به اطلاعات شما دسترسی ندارد. همه چیز در اینجا فقط برای یک هدف است: گرامیداشت یاد عزیزان شما.',
			privacyFeatures: 'چگونه از شما محافظت می‌کنیم',
			featureNoTracking: 'بدون ردیابی - ما نمی‌دانیم شما کی هستید یا از کجا آمده‌اید',
			featureNoAds: 'بدون تبلیغات - هیچ شرکتی پولی به ما نمی‌دهد',
			featureNoAiTraining: 'بدون استفاده برای هوش مصنوعی - عکس‌ها و خاطرات شما فقط اینجا می‌مانند',
			featureEncrypted: 'پیام‌های خصوصی رمزنگاری شده - حتی ما هم نمی‌توانیم بخوانیم',
			featureTor: 'دسترسی امن از داخل ایران - با پشتیبانی از Tor',
			featureOffline: 'کار آفلاین - حتی بدون اینترنت می‌توانید یادبودها را ببینید',
			forFamilies: 'برای خانواده‌ها',
			forFamiliesText: 'می‌دانیم که از دست دادن عزیزان سخت است. این سایت متعلق به شماست. می‌توانید شمع روشن کنید، گل بگذارید، و خاطرات را به اشتراک بگذارید - با خیال راحت که حرمت عزیزانتان حفظ می‌شود.',
			inTheirMemory: 'به یادشان'
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
			namePersianPlaceholder: 'Full name in Persian',
			nameLatin: 'Name (English)',
			nameLatinPlaceholder: 'Full name in English',
			age: 'Age',
			agePlaceholder: 'Age',
			dateOfDeath: 'Date of Death',
			location: 'City/Province',
			locationPlaceholder: 'City or province',
			circumstances: 'Circumstances',
			circumstancesPlaceholder: 'Describe the circumstances (optional)',
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
		},
		about: {
			title: 'About This Memorial',
			whyThisSite: 'Why We Built This Site',
			whyThisSiteText: 'This site was created with one simple goal: to provide a safe and dignified place to remember the loved ones we lost in the Woman, Life, Freedom uprising. A place where families can share memories without worry.',
			protectingDignity: 'Protecting the Dignity of Your Loved Ones',
			protectingDignityText: 'When you post a photo or memory on social media like Facebook, Instagram, or Twitter, these companies can use them to train artificial intelligence. This means your loved one\'s face might one day appear somewhere else, with a completely different name and story.',
			whatHappensElsewhere: 'What Happens on Other Platforms?',
			whatHappensElsewhereText: 'Big technology companies use photos and text that users share to train AI programs. Imagine your child\'s, spouse\'s, or friend\'s face appearing in an AI-generated image with a completely fake identity. This is disrespectful to their memory.',
			howWeAreDifferent: 'How We Are Different',
			howWeAreDifferentText: 'We will never use your photos or memories for artificial intelligence. No company has access to your information. Everything here exists for one purpose only: honoring the memory of your loved ones.',
			privacyFeatures: 'How We Protect You',
			featureNoTracking: 'No tracking - We don\'t know who you are or where you come from',
			featureNoAds: 'No advertisements - No company pays us money',
			featureNoAiTraining: 'No AI training - Your photos and memories stay only here',
			featureEncrypted: 'Private messages are encrypted - Even we cannot read them',
			featureTor: 'Safe access from inside Iran - With Tor support',
			featureOffline: 'Works offline - You can view memorials even without internet',
			forFamilies: 'For Families',
			forFamiliesText: 'We know that losing loved ones is hard. This site belongs to you. You can light candles, leave flowers, and share memories - with peace of mind that your loved ones\' dignity is preserved.',
			inTheirMemory: 'In Their Memory'
		}
	}
};
