import _ from "lodash";

export const useSortBy = (
  sortBy: string,
  order: string,
  arrayDocs: Record<string, any>[]
) => {
  let sortedArray = [...arrayDocs];

  if (_.isDate(arrayDocs[0][sortBy])) {
    order === "asc"
    ? sortedArray.sort(
        (a, b) =>
          new Date(a[sortBy]).valueOf() -
          new Date(b[sortBy]).valueOf()
      )
    : sortedArray.sort(
        (a, b) =>
          new Date(b[sortBy]).valueOf() -
          new Date(a[sortBy]).valueOf()
      );
  }

  if (typeof arrayDocs[0][sortBy] === 'string' ) {
    order === "asc"
    ? sortedArray.sort((a, b) =>
        a[sortBy] < b[sortBy] ? -1 : 1
      )
    : sortedArray.sort((a, b) =>
        a[sortBy] > b[sortBy] ? -1 : 1
      );
  }

  if (typeof arrayDocs[0][sortBy] === 'number') {
    order === "asc"
    ? sortedArray.sort((a, b) => a[sortBy] - b[sortBy])
    : sortedArray.sort((a, b) => b[sortBy] - a[sortBy]);
  }

  return { sortedArray }
};
