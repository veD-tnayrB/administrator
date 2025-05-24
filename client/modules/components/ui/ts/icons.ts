interface IIcon {
	viewBox: string;
	icon: string;
}

interface IGeneralIcons {
	[key: string]: IIcon;
}

export /* bundle */ const GENERAL_ICONS: IGeneralIcons = {
	messageSurvey: {
		viewBox: '0 0 24 24',
		icon: `<g
					width="80"
					height="80"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="0.75"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="lucide lucide-messages-square">
					<path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
					<path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
				</g>`,
	},
	google: {
		viewBox: '0 0 256 262',
		icon: `
	<g>
		<path d="M255.878,133.451 C255.878,122.717 255.007,114.884 253.122,106.761 L130.55,106.761 L130.55,155.209 L202.497,155.209 C201.047,167.249 193.214,185.381 175.807,197.565 L175.563,199.187 L214.318,229.21 L217.003,229.478 C241.662,206.704 255.878,173.196 255.878,133.451" fill="#4285F4"/>
		<path d="M130.55,261.1 C165.798,261.1 195.389,249.495 217.003,229.478 L175.807,197.565 C164.783,205.253 149.987,210.62 130.55,210.62 C96.027,210.62 66.726,187.847 56.281,156.37 L54.75,156.5 L14.452,187.687 L13.925,189.152 C35.393,231.798 79.49,261.1 130.55,261.1" fill="#34A853"/>
		<path d="M56.281,156.37 C53.525,148.247 51.93,139.543 51.93,130.55 C51.93,121.556 53.525,112.853 56.136,104.73 L56.063,103 L15.26,71.312 L13.925,71.947 C5.077,89.644 0,109.517 0,130.55 C0,151.583 5.077,171.455 13.925,189.152 L56.281,156.37" fill="#FBBC05"/>
		<path d="M130.55,50.479 C155.064,50.479 171.6,61.068 181.029,69.917 L217.873,33.943 C195.245,12.91 165.798,0 130.55,0 C79.49,0 35.393,29.301 13.925,71.947 L56.136,104.73 C66.726,73.253 96.027,50.479 130.55,50.479" fill="#EB4335"/></g>`,
	},
	meets: {
		viewBox: '0 0 20 16',
		icon: `<g width="20" height="16" viewBox="0 0 20 16" fill="none">
<g clip-path="url(#clip0_2361_2437)">
<path d="M11.2756 7.98646L13.1681 10.1496L15.7131 11.7758L16.1558 8.00011L15.7131 4.30957L13.1194 5.73812L11.2756 7.98646Z" fill="#00832D"/>
<path d="M0.293823 11.4245V14.642C0.293823 15.3766 0.890146 15.9731 1.62493 15.9731H4.84237L5.50861 13.5421L4.84237 11.4245L2.63498 10.7583L0.293823 11.4245Z" fill="#0066DA"/>
<path d="M4.84237 0L0.293823 4.54855L2.63513 5.21319L4.84237 4.54855L5.49648 2.45983L4.84237 0Z" fill="#E94235"/>
<path d="M0.293945 11.426H4.84242V4.54858H0.293945V11.426Z" fill="#2684FC"/>
<path d="M18.6187 1.92583L15.713 4.30961V11.7758L18.6307 14.1688C19.0675 14.5109 19.7064 14.1991 19.7064 13.6439V2.44011C19.7064 1.87874 19.0522 1.56845 18.6186 1.92591" fill="#00AC47"/>
<path d="M11.2756 7.98657V11.4245H4.84241V15.9731H14.382C15.1168 15.9731 15.7131 15.3766 15.7131 14.642V11.7759L11.2756 7.98657Z" fill="#00AC47"/>
<path d="M14.382 0H4.84241V4.54855H11.2756V7.9865L15.7132 4.30954V1.33118C15.7132 0.596398 15.1168 7.58294e-05 14.382 7.58294e-05" fill="#FFBA00"/>
</g>
<defs>
<clipPath id="clip0_2361_2437">
<rect width="19.4123" height="16" fill="white" transform="translate(0.293823)"/>
</clipPath>
</defs>
</g>
`,
	},
	checkCheck: {
		viewBox: '0 0 24 24',
		icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-check-icon lucide-check-check"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>`,
	},
	phoneCall: {
		viewBox: '0 0 24 24',
		icon: `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/><path d="M14.05 2a9 9 0 0 1 8 7.94"/><path d="M14.05 6A5 5 0 0 1 18 10"/>`,
	},
	x: {
		viewBox: '0 0 24 24',
		icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
	},
	notFile: {
		viewBox: '0 0 24 24',
		icon: `<g width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-question"><path d="M12 17h.01"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"/></g>`,
	},
	edit: {
		viewBox: '0 0 24 24',
		icon: `<path width="24" height="24" stroke-color="currentColor" fil="none" stroke-width="2" d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/><path d="m15 5 3 3"/>`,
	},
	contact: {
		viewBox: '0 0 24 24',
		icon: `g width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></g>`,
	},
	badgeCheck: {
		viewBox: '0 0 24 24',
		icon: `<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>`,
	},
	eye: {
		viewBox: '0 0 24 24',
		icon: `<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>`,
	},
	eyeClosed: {
		viewBox: '0 0 24 24',
		icon: `<path d="m15 18-.722-3.25"/><path d="M2 8a10.645 10.645 0 0 0 20 0"/><path d="m20 15-1.726-2.05"/><path d="m4 15 1.726-2.05"/><path d="m9 18 .722-3.25"/>`,
	},
	email: {
		viewBox: '0 0 24 24',
		icon: `<g
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="lucide lucide-mail">
					<rect width="20" height="16" x="2" y="4" rx="2" />
					<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
				</g>`,
	},
	phone: {
		viewBox: '0 0 24 24',
		icon: `<g width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-smartphone"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></g>`,
	},
	monitorSmartphone: {
		viewBox: '0 0 24 24',
		icon: `<g width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tablet-smartphone"><rect width="10" height="14" x="3" y="8" rx="2"/><path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4"/><path d="M8 18h.01"/></g>`,
	},
	smartphone: {
		viewBox: '0 0 24 24',
		icon: `<g width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-smartphone"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></g>`,
	},
	map: {
		viewBox: '0 0 24 24',
		icon: `<g width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pinned"><path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"/><circle cx="12" cy="8" r="2"/><path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"/></g>`,
	},
	location: {
		viewBox: '0 0 24 24',
		icon: `<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><path d="m9 10 2 2 4-4"/>`,
	},
	call: {
		viewBox: '0 0 24 24',
		icon: `<polyline points="22 8 22 2 16 2 fill="none"/><line x1="16" x2="22" y1="8" y2="2"/><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>`,
	},
	circleCheckBig: {
		viewBox: '0 0 24 24',
		icon: `<g xmlns="http://www.w3.org/2000/g" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></g>`,
	},
	circleSlash2: {
		viewBox: '0 0 24 24',
		icon: `<g xmlns="http://www.w3.org/2000/g" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-slash-2"><circle cx="12" cy="12" r="10"/><path d="M22 2 2 22"/></g>`,
	},
	message: {
		viewBox: '0 0 24 24',
		icon: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/>`,
	},
	clock: {
		viewBox: '0 0 24 24',
		icon: `<g width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock8-icon lucide-clock-8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 8 14"/></g>`,
	},
	editItem: {
		viewBox: '0 0 24 24',
		icon: `<g
			xmlns="http://www.w3.org/2000/g"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="lucide lucide-pencil-line">
			<path d="M12 20h9" />
			<path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
			<path d="m15 5 3 3" />
		</g>`,
	},
	launch: {
		viewBox: '0 0 24 24',
		icon: `<g xmlns="http://www.w3.org/2000/g" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right-from-square"> <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" /> <path d="m21 3-9 9" /> <path d="M15 3h6v6" /> </g>`,
	},
	fileImage: {
		viewBox: '0 0 24 24',
		icon: `<g xmlns="http://www.w3.org/2000/g" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-image"> <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /> <path d="M14 2v4a2 2 0 0 0 2 2h4" /><circle cx="10" cy="12" r="2" /><path d="m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22" /></g>`,
	},
	scanEye: {
		viewBox: '0 0 24 24',
		icon: `<g
					width="64"
					height="64"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="lucide lucide-scan-eye">
					<path d="M3 7V5a2 2 0 0 1 2-2h2" />
					<path d="M17 3h2a2 2 0 0 1 2 2v2" />
					<path d="M21 17v2a2 2 0 0 1-2 2h-2" />
					<path d="M7 21H5a2 2 0 0 1-2-2v-2" />
					<circle cx="12" cy="12" r="1" />
					<path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0" />
				</g>`,
	},
	user: {
		viewBox: '0 0 24 24',
		icon: `<g
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="var(--secondary)"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="lucide lucide-user">
					<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
					<circle cx="12" cy="7" r="4" />
				</g>`,
	},
};
