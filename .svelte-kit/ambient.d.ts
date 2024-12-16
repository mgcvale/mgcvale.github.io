
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const XDG_SESSION_PATH: string;
	export const WLR_XWAYLAND: string;
	export const MAIL: string;
	export const _JAVA_AWT_WM_NONREPARENTING: string;
	export const PYTHONSTARTUP: string;
	export const MOZ_ENABLE_WAYLAND: string;
	export const HOST: string;
	export const CSHEDIT: string;
	export const XDG_BACKEND: string;
	export const VENDOR: string;
	export const SDK_HOME: string;
	export const WAYLAND_DISPLAY: string;
	export const GPG_TTY: string;
	export const JAVA_HOME: string;
	export const LESS: string;
	export const IJ_RESTARTER_LOG: string;
	export const LSCOLORS: string;
	export const XAUTHLOCALHOSTNAME: string;
	export const npm_config_color: string;
	export const OSTYPE: string;
	export const HYPRLAND_CMD: string;
	export const KITTY_INSTALLATION_DIR: string;
	export const XDG_SESSION_DESKTOP: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const HOSTNAME: string;
	export const CLUTTER_BACKEND: string;
	export const MANPATH: string;
	export const LS_OPTIONS: string;
	export const SHLVL: string;
	export const WINDOWMANAGER: string;
	export const QT_QPA_PLATFORM_THEME: string;
	export const XDG_SESSION_CLASS: string;
	export const G_FILENAME_ENCODING: string;
	export const MOZ_GMP_PATH: string;
	export const HOME: string;
	export const CONFIG_SITE: string;
	export const MACHTYPE: string;
	export const LESSKEY: string;
	export const PROFILEREAD: string;
	export const MOCHA_COLORS: string;
	export const LANG: string;
	export const KITTY_WINDOW_ID: string;
	export const QT_SCALE_FACTOR: string;
	export const XDG_RUNTIME_DIR: string;
	export const PAM_KWALLET5_LOGIN: string;
	export const PAGER: string;
	export const HL_INITIAL_WORKSPACE_TOKEN: string;
	export const USER: string;
	export const XDG_SESSION_TYPE: string;
	export const PWD: string;
	export const QT_AUTO_SCREEN_SCALE_FACTOR: string;
	export const PATH_TO_FX: string;
	export const KITTY_PID: string;
	export const NODE_PATH: string;
	export const XDG_SEAT_PATH: string;
	export const HISTSIZE: string;
	export const XKEYSYMDB: string;
	export const ZSH: string;
	export const FORCE_COLOR: string;
	export const PATH: string;
	export const JAVA_BINDIR: string;
	export const LOGNAME: string;
	export const LESSCLOSE: string;
	export const TERMINFO: string;
	export const LS_COLORS: string;
	export const XNLSPATH: string;
	export const QT_WAYLAND_DISABLE_WINDOWDECORATION: string;
	export const XDG_CONFIG_DIRS: string;
	export const QEMU_AUDIO_DRV: string;
	export const XDG_SESSION_ID: string;
	export const MINICOM: string;
	export const KITTY_PUBLIC_KEY: string;
	export const XDG_SEAT: string;
	export const XDG_VTNR: string;
	export const XDG_DATA_DIRS: string;
	export const SHELL: string;
	export const LESS_ADVANCED_PREPROCESSOR: string;
	export const DEBUG_COLORS: string;
	export const COLORTERM: string;
	export const DISPLAY: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const JDK_HOME: string;
	export const JRE_HOME: string;
	export const DEBUGINFOD_URLS: string;
	export const TERM: string;
	export const MANPATHISSET: string;
	export const QT_QPA_PLATFORMTHEME: string;
	export const LESSOPEN: string;
	export const G_BROKEN_FILENAMES: string;
	export const MORE: string;
	export const CPU: string;
	export const HOSTTYPE: string;
	export const FROM_HEADER: string;
	export const OLDPWD: string;
	export const HYPRLAND_INSTANCE_SIGNATURE: string;
	export const QT_QPA_PLATFORM: string;
	export const GDK_BACKEND: string;
	export const DESKTOP_SESSION: string;
	export const AUDIODRIVER: string;
	export const NODE_VERSION: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		XDG_SESSION_PATH: string;
		WLR_XWAYLAND: string;
		MAIL: string;
		_JAVA_AWT_WM_NONREPARENTING: string;
		PYTHONSTARTUP: string;
		MOZ_ENABLE_WAYLAND: string;
		HOST: string;
		CSHEDIT: string;
		XDG_BACKEND: string;
		VENDOR: string;
		SDK_HOME: string;
		WAYLAND_DISPLAY: string;
		GPG_TTY: string;
		JAVA_HOME: string;
		LESS: string;
		IJ_RESTARTER_LOG: string;
		LSCOLORS: string;
		XAUTHLOCALHOSTNAME: string;
		npm_config_color: string;
		OSTYPE: string;
		HYPRLAND_CMD: string;
		KITTY_INSTALLATION_DIR: string;
		XDG_SESSION_DESKTOP: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		HOSTNAME: string;
		CLUTTER_BACKEND: string;
		MANPATH: string;
		LS_OPTIONS: string;
		SHLVL: string;
		WINDOWMANAGER: string;
		QT_QPA_PLATFORM_THEME: string;
		XDG_SESSION_CLASS: string;
		G_FILENAME_ENCODING: string;
		MOZ_GMP_PATH: string;
		HOME: string;
		CONFIG_SITE: string;
		MACHTYPE: string;
		LESSKEY: string;
		PROFILEREAD: string;
		MOCHA_COLORS: string;
		LANG: string;
		KITTY_WINDOW_ID: string;
		QT_SCALE_FACTOR: string;
		XDG_RUNTIME_DIR: string;
		PAM_KWALLET5_LOGIN: string;
		PAGER: string;
		HL_INITIAL_WORKSPACE_TOKEN: string;
		USER: string;
		XDG_SESSION_TYPE: string;
		PWD: string;
		QT_AUTO_SCREEN_SCALE_FACTOR: string;
		PATH_TO_FX: string;
		KITTY_PID: string;
		NODE_PATH: string;
		XDG_SEAT_PATH: string;
		HISTSIZE: string;
		XKEYSYMDB: string;
		ZSH: string;
		FORCE_COLOR: string;
		PATH: string;
		JAVA_BINDIR: string;
		LOGNAME: string;
		LESSCLOSE: string;
		TERMINFO: string;
		LS_COLORS: string;
		XNLSPATH: string;
		QT_WAYLAND_DISABLE_WINDOWDECORATION: string;
		XDG_CONFIG_DIRS: string;
		QEMU_AUDIO_DRV: string;
		XDG_SESSION_ID: string;
		MINICOM: string;
		KITTY_PUBLIC_KEY: string;
		XDG_SEAT: string;
		XDG_VTNR: string;
		XDG_DATA_DIRS: string;
		SHELL: string;
		LESS_ADVANCED_PREPROCESSOR: string;
		DEBUG_COLORS: string;
		COLORTERM: string;
		DISPLAY: string;
		XDG_CURRENT_DESKTOP: string;
		JDK_HOME: string;
		JRE_HOME: string;
		DEBUGINFOD_URLS: string;
		TERM: string;
		MANPATHISSET: string;
		QT_QPA_PLATFORMTHEME: string;
		LESSOPEN: string;
		G_BROKEN_FILENAMES: string;
		MORE: string;
		CPU: string;
		HOSTTYPE: string;
		FROM_HEADER: string;
		OLDPWD: string;
		HYPRLAND_INSTANCE_SIGNATURE: string;
		QT_QPA_PLATFORM: string;
		GDK_BACKEND: string;
		DESKTOP_SESSION: string;
		AUDIODRIVER: string;
		NODE_VERSION: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
