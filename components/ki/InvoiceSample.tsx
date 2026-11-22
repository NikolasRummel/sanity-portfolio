/** Beispielrechnung mit der Zeile, die daraus in der Tabelle landet. Frei erfundene Beispieldaten. */
export default function InvoiceSample() {
    return (
        <div className="inv clear">
            <div>
                <p className="inv__label">Eingehende Rechnung (Beispiel)</p>
                <div className="inv__sheet" aria-hidden="true">
                    <p>Muster Großhandel GmbH</p>
                    <p>Rechnung 2024-0815, 14.03.2025</p>
                    <p>12 Kartons Verpackungsmaterial</p>
                    <p>Gesamt 1.248,00 €</p>
                </div>
            </div>
            <div>
                <p className="inv__label">Landet automatisch in Excel</p>
                <table className="inv__table">
                    <thead>
                        <tr><th scope="col">Lieferant</th><th scope="col">Datum</th><th scope="col">Nr.</th><th scope="col" className="num">Betrag</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Muster Großhandel</td><td>14.03.2025</td><td>2024-0815</td><td className="num">1.248,00 €</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
