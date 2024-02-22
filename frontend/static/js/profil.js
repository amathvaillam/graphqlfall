import { processXPData,generateChartData,createPathElement,createTextElement,createLineElement,createRectElement,hide,show} from "./utils.js";
import {updateDom, parseTransactions,parseUserInfo,parseUserLevel,parseUserXp ,student} from "./query.js";


export async function init() {
    try{
    await parseUserInfo()
    await parseTransactions()
    await parseUserXp()
    await parseUserLevel()
 
    updateDom()

    const xpResult = processXPData(student.xp_view);
    DiagramBar(xpResult);  
    const ChartData = generateChartData(student);

    CirculeDiagram(ChartData)
    } catch (error) {
        console.error('Error during initialization:', error);
        return '<p>Error fetching JSON</p>';
    }
}


function CirculeDiagram(data) {
    const svg = document.getElementById("ratio");
    const centerX = 100;
    const centerY = 100;
    const radius = 100;
    let startAngle = 0;

    svg.appendChild(createTextElement(150, 50, "white", "30px", "Arial, sans-serif", ""));

    data.forEach(item => {
        const { label, value, color } = item;
        const angle = (value / 100) * Math.PI * 2;
        const endAngle = startAngle + angle;

        const x1 = centerX + radius * Math.cos(startAngle);
        const y1 = centerY + radius * Math.sin(startAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);

        const largeArcFlag = angle > Math.PI ? 1 : 0;
        const d = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            "Z"
        ].join(" ");

        const path = createPathElement(d, color,
            event => show(`${label} ${value.toFixed(2)} %`, event),
            () => hide()
        );

        svg.appendChild(path);
        startAngle = endAngle;
    });
}


function DiagramBar(data) {
    const svg = document.getElementById('xp');
    const svgHeight = 200;
    const barWidth = 10;
    const xOffset = 20;
    const barGap = 5;
    const xp_max = Math.max(...data.map(item => item.xp));
    const yAxisLength = svgHeight + 10;
    const xAxisLength = data.length * (barWidth + barGap) + 50;

    // Dessiner le texte "Projects Done"
    svg.appendChild(createTextElement(320, 20, "white", "30px", "Arial, sans-serif", ""));

    // Dessiner l'axe Y
    svg.appendChild(createTextElement(30, 30, "white", "30px", "Arial, sans-serif", "XP"));
    svg.appendChild(createLineElement(xOffset, 5, xOffset, yAxisLength, "white"));

    // Dessiner l'axe X
    svg.appendChild(createTextElement(350, 250, "white", "30px", "Arial, sans-serif", "Projects"));
    svg.appendChild(createLineElement(xOffset, yAxisLength, xAxisLength, yAxisLength, "white"));

    data.forEach((item, index) => {
        const barHeight = (item.xp / xp_max) * svgHeight;
        const bar = createRectElement(20 + (barWidth + barGap) * index, 10 + svgHeight - barHeight, barWidth, barHeight, "white", "barre","blue");

        // Ajouter un événement de survol pour afficher une infobulle
        bar.addEventListener("mouseover", () => show(`${item.name} - ${item.xp} XP`,event));
        bar.addEventListener("mouseout", ()=>hide());

        svg.appendChild(bar);
    });
}
