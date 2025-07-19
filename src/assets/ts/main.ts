function setupListeners() {
	const menu = document.getElementById("menu") as HTMLElement;
	const menuBackground = document.getElementById(
		"mobileMenuBackground",
	) as HTMLElement;
	const closeMenuBtn = document.getElementById("closeMenu") as HTMLElement;
	const openMenuBtn = document.getElementById("openMenu") as HTMLElement;

	const closeMenu = () => {
		closeMenuBtn.classList.add("hidden");
		menu.classList.add("hidden");
		menuBackground.classList.add("hidden");

		openMenuBtn.classList.remove("hidden");
	};

	menuBackground.onclick = closeMenu;
	closeMenuBtn.addEventListener("click", closeMenu);

	openMenuBtn.addEventListener("click", () => {
		openMenuBtn.classList.add("hidden");
		closeMenuBtn.classList.remove("hidden");
		menu.classList.remove("hidden");

		menuBackground.classList.add("opacity-0");
		menuBackground.classList.remove("hidden");

		setTimeout(() => {
			menuBackground.classList.remove("opacity-0");
		});
	});

	const menuItems: NodeListOf<HTMLAnchorElement> =
		document.querySelectorAll("#menu a");

	for (const item of menuItems) {
		if (item.pathname === location.pathname) {
			item.classList.add("text-neutral-900", "dark:text-white");
		}
	}

	const sunIcon = document.getElementById("sun") as HTMLElement;
	const moonIcon = document.getElementById("moon") as HTMLElement;
	const nightText = document.getElementById("nightText") as HTMLElement;
	const dayText = document.getElementById("dayText") as HTMLElement;
	const themeToggle = document.getElementById("themeToggle") as HTMLElement;
	const documentElClassList = document.documentElement.classList;

	const showDay = (animate?: boolean) => {
		sunIcon.classList.remove("setting");
		moonIcon.classList.remove("rising");

		let timeout = 0;

		if (animate) {
			timeout = 500;
			moonIcon.classList.add("setting");
		}

		setTimeout(() => {
			dayText.classList.remove("hidden");
			nightText.classList.add("hidden");

			moonIcon.classList.add("hidden");
			sunIcon.classList.remove("hidden");

			if (animate) {
				sunIcon.classList.add("rising");
			}

			documentElClassList.remove("dark");
		}, timeout);
	};

	const showNight = (animate?: boolean) => {
		moonIcon.classList.remove("setting");
		sunIcon.classList.remove("rising");

		let timeout = 0;

		if (animate) {
			timeout = 500;
			sunIcon.classList.add("setting");
		}

		setTimeout(() => {
			nightText.classList.remove("hidden");
			dayText.classList.add("hidden");

			sunIcon.classList.add("hidden");
			moonIcon.classList.remove("hidden");

			if (animate) {
				moonIcon.classList.add("rising");
			}

			documentElClassList.add("dark");
		}, timeout);
	};

	themeToggle.addEventListener("click", () => {
		documentElClassList.add("duration-300");

		if (documentElClassList.contains("dark")) {
			localStorage.removeItem("darkMode");
			showDay(true);
		} else {
			localStorage.setItem("darkMode", "true");
			showNight(true);
		}
	});

	if (localStorage.getItem("darkMode") === "true") {
		showNight();
	} else {
		showDay();
	}

	const headerEl = document.getElementById("header") as HTMLElement;
	const headerChildEl = headerEl.firstElementChild as HTMLElement;
	const headerChildElClassList = headerChildEl.classList;

	const stickyClasses = ["fixed", "h-14"];
	const unStickyClasses = ["absolute", "h-20"];
	const containerStickyClasses = [
		"border-neutral-300/50",
		"bg-white/80",
		"dark:border-neutral-600/40",
		"dark:bg-neutral-900/60",
		"backdrop-blur-2xl",
	];
	const containerUnStickyClasses = ["border-transparent"];

	const calcHeaderPosition = () => {
		if (window.scrollY > 16) {
			headerChildElClassList.add(...containerStickyClasses);
			headerChildElClassList.remove(...containerUnStickyClasses);

			headerEl.classList.add(...stickyClasses);
			headerEl.classList.remove(...unStickyClasses);

			menu.classList.add("top-[56px]");
			menu.classList.remove("top-[75px]");
		} else {
			headerChildElClassList.remove(...containerStickyClasses);
			headerChildElClassList.add(...containerUnStickyClasses);

			headerEl.classList.add(...unStickyClasses);
			headerEl.classList.remove(...stickyClasses);

			menu.classList.remove("top-[56px]");
			menu.classList.add("top-[75px]");
		}
	};

	calcHeaderPosition();
	window.addEventListener("scroll", calcHeaderPosition);
}

document.addEventListener("DOMContentLoaded", setupListeners);
document.addEventListener("astro:after-swap", setupListeners);
