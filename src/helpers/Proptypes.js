import PropTypes from "prop-types"

//eslint-disable-next-line
export const pPaginator = PropTypes.shape({
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  totalContacts: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
})
