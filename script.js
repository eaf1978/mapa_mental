let blockCount = 1; // Começa com 1 bloco

function addSubchapter() {
  blockCount++;

  const blocksContainer = document.getElementById("blocksContainer");

  const block = document.createElement("div");
  block.className = "block";
  block.id = `block${blockCount}`;

  block.innerHTML = `
    <label>Tópico ${blockCount}:</label>
    <input type="text" name="subchapter${blockCount}" required />
    <label>Subtópicos:</label>
    <textarea name="topics${blockCount}" maxlength="120" required></textarea>
  `;

  blocksContainer.appendChild(block);
}

function generateMap() {
  const form = document.getElementById("mindMapForm");
  const data = new FormData(form);
  const chapter = data.get("chapterTitle");

  const chapterTitleOutput = document.getElementById("outputChapterTitle");
  chapterTitleOutput.textContent = chapter || "Título do Capítulo";

  const output = document.getElementById("output");
  output.innerHTML = "";

  for (let i = 1; i <= blockCount; i++) {
    const sub = data.get(`subchapter${i}`);
    const topics = data.get(`topics${i}`);

    if (sub && topics) {
      const block = document.createElement("div");
      block.className = "output-block";

      const titleInput = document.createElement("input");
      titleInput.value = sub;
      titleInput.readOnly = true;
      titleInput.style.pointerEvents = "none";

      const topicTextarea = document.createElement("textarea");
      topicTextarea.value = topics;
      topicTextarea.rows = 5;
      topicTextarea.maxLength = 120;
      topicTextarea.readOnly = true;
      topicTextarea.style.pointerEvents = "none";

      block.appendChild(titleInput);
      block.appendChild(document.createElement("hr"));
      block.appendChild(topicTextarea);
      output.appendChild(block);
    }
  }
}

function exportToTxt() {
  const chapter = document.getElementById("chapterTitle").value || "Título do Capítulo";

  let content = `Capítulo: ${chapter}\n\n`;

  for (let i = 1; i <= blockCount; i++) {
    const subInput = document.querySelector(`[name=subchapter${i}]`);
    const topicsTextarea = document.querySelector(`[name=topics${i}]`);

    if (subInput && topicsTextarea) {
      const sub = subInput.value;
      const topics = topicsTextarea.value;

      if (sub && topics) {
        content += `Subcapítulo ${i}: ${sub}\n`;
        content += `Tópicos:\n${topics}\n\n`;
      }
    }
  }

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${chapter || 'mapa-mental'}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function clearFormAndPreview() {
  const form = document.getElementById("mindMapForm");
  form.reset(); // Limpa os campos do formulário

  // Limpa a área de visualização (output)
  document.getElementById("outputChapterTitle").textContent = "";
  document.getElementById("output").innerHTML = "";

  // Remove todos os blocos, exceto o primeiro
  const blocksContainer = document.getElementById("blocksContainer");
  blocksContainer.innerHTML = ""; // Remove todos os blocos

  blockCount = 1; // Reseta o contador para o Tópico 1

  // Recria o Tópico 1
  addSubchapter(); // Cria o primeiro bloco (Tópico 1)

  // Força o navegador a recarregar a página e limpar o cache
  window.location.reload(true); // Passando 'true' força o recarregamento completo
}
