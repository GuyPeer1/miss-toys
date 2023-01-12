import { LabelsCountChart } from '../cmps/label-count-chart.jsx'
import { LabelsPriceChart } from '../cmps/label-price-chart.jsx'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadToys } from '../store/toy.action'

export function DashBoard() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
    }, [])


    function getChartsData() {
        const chartsData = toys.reduce(
            (acc, toy) => {
                toy.labels.forEach((label) => {
                    acc.labelsCountMap[label] = acc.labelsCountMap[label] ? ++acc.labelsCountMap[label] : 1
                    acc.labelsPriceMap[label] = acc.labelsPriceMap[label] ? (acc.labelsPriceMap[label] += toy.price) : toy.price
                })

                return acc
            },
            { labelsCountMap: {}, labelsPriceMap: {} }
        )
        Object.keys(chartsData.labelsPriceMap).forEach((label) => (chartsData.labelsPriceMap[label] /= chartsData.labelsCountMap[label]))

        return chartsData
    }

    const { labelsPriceMap, labelsCountMap } = getChartsData()

    return (
        <section className="dash-board">
            <h2>Welcome To The Toy Store</h2>
            <div className="charts flex">
                <LabelsCountChart dataMap={labelsCountMap} />
                <LabelsPriceChart dataMap={labelsPriceMap} />
            </div>
        </section>
    )
}
