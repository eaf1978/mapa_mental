function generateMap() {
  const form = document.getElementById("mindMapForm");
  const data = new FormData(form);
  const chapter = data.get("chapterTitle");

  // Inserir o título do capítulo na visualização
  const chapterTitleOutput = document.getElementById("outputChapterTitle");
  chapterTitleOutput.textContent = chapter || "Título do Capítulo"; // Título padrão se não preenchido

  const output = document.getElementById("output");
  output.innerHTML = "";

  for (let i = 1; i <= 9; i++) {
    const sub = data.get(`subchapter${i}`);
    const topics = data.get(`topics${i}`);

    if (sub && topics) {
      const block = document.createElement("div");
      block.className = "output-block";

      const titleInput = document.createElement("input");
      titleInput.value = sub;
      titleInput.readOnly = true; // Evita edição
      titleInput.style.pointerEvents = "none"; // Garante não interativo

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

  for (let i = 1; i <= 9; i++) {
    const sub = document.querySelector(`[name=subchapter${i}]`).value;
    const topics = document.querySelector(`[name=topics${i}]`).value;

    if (sub && topics) {
      content += `Subcapítulo ${i}: ${sub}\n`;
      content += `Tópicos:\n${topics}\n\n`;
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
  form.reset();

  // Limpa a visualização do capítulo e os blocos
  document.getElementById("outputChapterTitle").textContent = "";
  document.getElementById("output").innerHTML = "";
}

