const COPIED = "Command copied to the clipboard.";
const COPY_FAILED = "Copy failed. Select the command and copy it manually.";

class TerminalExample extends HTMLElement {
  connectedCallback() {
    if (this.dataset.enhanced === "true") return;

    const code = this.querySelector("pre code");
    const status = this.querySelector(".terminal-status");
    const clipboard = navigator.clipboard;

    if (!code || !clipboard || typeof clipboard.writeText !== "function") return;

    const command = code.textContent.trim();
    if (command === "") return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-command";
    button.textContent = "Copy command";

    let clearPending = false;

    const announce = (message) => {
      if (!status) return;
      status.textContent = "";
      if (clearPending) return;
      clearPending = true;
      requestAnimationFrame(() => {
        clearPending = false;
        status.textContent = message;
      });
    };

    button.addEventListener("click", async () => {
      try {
        await clipboard.writeText(command);
        announce(COPIED);
      } catch {
        announce(COPY_FAILED);
      }
    });

    this.dataset.enhanced = "true";
    this.querySelector(".terminal").append(button);
  }
}

customElements.define("terminal-example", TerminalExample);
