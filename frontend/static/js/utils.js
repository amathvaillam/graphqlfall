export function processXPData(xpData) {
    return xpData.map(element => {
        const name = element.path.split('/')[3];
        return {
            name: name,
            xp: element.amount / 1000
        };
    });
}

export function SetError ( code,errorMessage,Message ) {
    localStorage.setItem( "user_error",JSON.stringify( { code,errorMessage,Message } ) )
}

export function GetError () {
    return JSON.parse( localStorage.getItem( "user_error" ) )
}

function calculatePercentage(value, total) {
    return (value / total) * 100;
}

export function generateChartData(student) {
    const total = student.totalDown + student.totalUp;
    
    const DownPercentage = calculatePercentage(student.totalDown, total);
    const UpPercentage = calculatePercentage(student.totalUp, total);

    const chartData = [
        { label: "Total Down", value: DownPercentage, color: "blue" },
        { label: "Total Up", value: UpPercentage, color: "white" }
    ];

    return chartData;
}
export function createSvgElement(type, attributes) {
    const svgNS = "http://www.w3.org/2000/svg";
    const element = document.createElementNS(svgNS, type);

    for (const key in attributes) {
        if(key=="textContent"){
          element.textContent=attributes[key]  
        }
        element.setAttribute(key, attributes[key]);
    }

    return element;
}

export function createTextElement(x, y, fill, fontSize, fontFamily, textContent) {
    return createSvgElement("text", { x, y, fill, "font-size": fontSize, "font-family": fontFamily, "textContent":textContent });
}

export function createPathElement(d, fill, mouseoverCallback, mouseoutCallback) {
    const path = createSvgElement("path", { d, fill });

    path.addEventListener("mouseover", mouseoverCallback);
    path.addEventListener("mouseout", mouseoutCallback);

    return path;
}


export function createLineElement(x1, y1, x2, y2, stroke) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1.toString());
    line.setAttribute("y1", y1.toString());
    line.setAttribute("x2", x2.toString());
    line.setAttribute("y2", y2.toString());
    line.setAttribute("stroke", stroke);
    return line;
}

export function createRectElement(x, y, width, height, stroke, className,fillColor) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", x.toString());
    rect.setAttribute("y", y.toString());
    rect.setAttribute("width", width.toString());
    rect.setAttribute("height", height.toString());
    rect.setAttribute("stroke", stroke);
    rect.setAttribute("fill", fillColor); // Ajout de la couleur de remplissage
    if (className) {
        rect.setAttribute("class", className);
    }
    return rect;
}


export function show(text, event) {
    let tt = document.getElementById('tt');
    if (!tt) {
        tt = document.createElement('div');
        tt.id = 'tt';

        document.body.appendChild(tt);
    }
    tt.textContent = text;

    const w = tt.offsetWidth;
    const h = tt.offsetHeight;

    const left = event.clientX + 15 < window.innerWidth - w
        ? event.clientX + 15
        : window.innerWidth - w - 15;

    const top = event.clientY - h > 0
        ? event.clientY - h
        : event.clientY + 15;

    tt.style.left = `${left}px`;
    tt.style.top = `${top}px`;
    tt.style.visibility = 'visible';
}

export function hide() {
    const tt = document.getElementById('tt');
    if (tt) {
        tt.style.visibility = 'hidden';
    }
}

