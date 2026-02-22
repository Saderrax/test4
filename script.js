const select = document.getElementById("brainrotSelect");
const levelInput = document.getElementById("levelInput");
const resultSpan = document.getElementById("result");
const lvlMultSpan = document.getElementById("lvlMult");
const mutMultSpan = document.getElementById("mutMult");
const formulaText = document.getElementById("formulaText");

// Charger le menu
for (const name in brainrots) {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
}

function calculate() {
    const selectedName = select.value;
    let level = parseInt(levelInput.value) || 1;

    if (!selectedName || !brainrots[selectedName]) return;

    const baseValue = brainrots[selectedName].base;
    
    // Multiplicateur de niveau (+33% par niveau sup)
    let levelMult = 1 + (0.33 * (level - 1));
    
    // Multiplicateur de mutations
    let mutationMult = 1;
    document.querySelectorAll(".mutation-check").forEach(box => {
        if (box.checked) mutationMult *= parseFloat(box.value);
    });

    const finalResult = baseValue * levelMult * mutationMult;

    // Mise à jour de l'affichage
    resultSpan.textContent = "$" + Math.round(finalResult).toLocaleString('en-US');
    lvlMultSpan.textContent = levelMult.toFixed(2) + "x";
    mutMultSpan.textContent = mutationMult.toFixed(1) + "x";
    
    // Affichage de la formule demandée
    formulaText.textContent = `(${baseValue} × ${levelMult.toFixed(2)} × ${mutationMult.toFixed(1)})`;
}

function resetAll() {
    levelInput.value = 1;
    document.querySelectorAll(".mutation-check").forEach(b => b.checked = false);
    calculate();
}

function copyResult() {
    const val = resultSpan.textContent;
    navigator.clipboard.writeText(val);
    alert("Result copied to clipboard!");
}

// Lancer au démarrage
calculate();
