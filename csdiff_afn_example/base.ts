const CTRL_LETTER_OFFSET = 64;

if (BrowserFeatures.clipboard.readText) {
	actionRegistry.registerWorkbenchAction(SyncActionDescriptor.from(TerminalPasteAction, {
		primary: KeyMod.CtrlCmd | KeyCode.KEY_V,
		win: { primary: KeyMod.CtrlCmd | KeyCode.KEY_V, secondary: [KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KEY_V] },
		linux: { primary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KEY_V }
	}, KEYBINDING_CONTEXT_TERMINAL_FOCUS), 'Terminal: Paste into Active Terminal', category, KEYBINDING_CONTEXT_TERMINAL_PROCESS_SUPPORTED);
	// An extra Windows-only ctrl+v keybinding is used for pwsh that sends ctrl+v directly to the
	// shell, this gets handled by PSReadLine which properly handles multi-line pastes. This is
	// disabled in accessibility mode as PowerShell does not run PSReadLine when it detects a screen
	// reader.
	if (platform.isWindows) {
		registerSendSequenceKeybinding(String.fromCharCode('V'.charCodeAt(0) - CTRL_LETTER_OFFSET), { // ctrl+v
			when: ContextKeyExpr.and(KEYBINDING_CONTEXT_TERMINAL_FOCUS, ContextKeyExpr.equals(KEYBINDING_CONTEXT_TERMINAL_SHELL_TYPE_KEY, WindowsShellType.PowerShell), CONTEXT_ACCESSIBILITY_MODE_ENABLED.negate()),
			primary: KeyMod.CtrlCmd | KeyCode.KEY_V
		});
	}
}