import { Paper } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AvgPriceChart } from "../cmps/avg-price-chart";
import { InventoryBreakdownChart } from "../cmps/inventory-breakdown-chart";
import { toyService } from "../services/toy.service";
import { loadToys } from "../store/toy.action";




export function Dashboard() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    useEffect(() => {
        if (!toys.length) loadToys()
    }, [])


    const [labelsWithToys, avgPrices] = toyService.getAvgToyPricePerType(toys)
    const [toyLabels, toyCount] = toyService.getToyCountPerType(toys)

    return (
        <section>
            <h1 style={{ textAlign: 'center', padding: '20px' }}>DASHBOARDDD STATSS</h1>
            <Paper elevation={7}>
                <AvgPriceChart labelsData={labelsWithToys} priceData={avgPrices} />
            </Paper>

            <Paper elevation={7}>
                <InventoryBreakdownChart labelsData={toyLabels} countData={toyCount} />
            </Paper>
        </section>
    )
}

