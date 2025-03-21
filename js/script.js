const operatorDescriptions = {
    AND: {
        description: "El operador AND (∧) devuelve verdadero solo si ambas condiciones son verdaderas.",
        example: "Si el auto tiene carga en su batería (A) y tiene combustible (B), entonces es posible que encienda.",
        image: "img/and.jpeg"
    },
    OR: {
        description: "El operador OR (∨) devuelve verdadero si al menos una de las condiciones es verdadera.",
        example: "Si tienes dinero en efectivo (A) o una tarjeta de crédito (B), puedes pagar tu compra.",
        image: "img/or.jpeg"
    },
    NOT: {
        description: "El operador NOT (¬) invierte el valor de la condición. Si es verdadero, se convierte en falso, y viceversa.",
        example: "Si NO hay luz solar, entonces ya se hizo noche.",
        image: "img/not.jpeg"
    },
    XOR: {
        description: "El operador XOR (⊕) devuelve verdadero si solo una de las condiciones es verdadera, pero no ambas.",
        example: "Si tienes un boleto que se puede utilizar para un concierto (A) o para el cine (B), puedes asistir solo a uno de ellos.",
        image: "img/xor.jpeg"
    }
};

document.getElementById('generate').addEventListener('click', () => {
    const operator = document.getElementById('operator').value;
    const tableBody = document.getElementById('tableBody');
    const description = document.getElementById('description');
    const operatorImage = document.getElementById('operatorImage');

    tableBody.innerHTML = ''; // Limpiar la tabla antes de generar una nueva
    const rows = generateTruthTable(operator);

    rows.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });

    // Mostrar explicación, ejemplo e imagen
    description.innerHTML = `
        <strong>Descripción:</strong> ${operatorDescriptions[operator].description}<br>
        <strong>Ejemplo:</strong> ${operatorDescriptions[operator].example}
    `;
    operatorImage.src = operatorDescriptions[operator].image;
    operatorImage.alt = `Imagen del operador ${operator}`;
});

function generateTruthTable(operator) {
    const truthTable = [];
    const values = [true, false];

    if (operator === 'NOT') {
        values.forEach(a => {
            truthTable.push([a, '', !a]);
        });
    } else {
        values.forEach(a => {
            values.forEach(b => {
                let result;
                switch (operator) {
                    case 'AND':
                        result = a && b;
                        break;
                    case 'OR':
                        result = a || b;
                        break;
                    case 'XOR':
                        result = a !== b;
                        break;
                }
                truthTable.push([a, b, result]);
            });
        });
    }

    return truthTable;
}
