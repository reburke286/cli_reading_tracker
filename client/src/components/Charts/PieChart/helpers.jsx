import _ from 'lodash'

export const booksReadByAuthorGender = (data) => {
    const groupedByGender = _.groupBy(data, 'authorGender')
    const graphData = []
    for (const key of Object.keys(groupedByGender)) {
        const curr = groupedByGender[key]
        graphData.push({name: key, value: curr.authorGender})
    }
}