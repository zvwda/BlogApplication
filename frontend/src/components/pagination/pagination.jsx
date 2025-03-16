import "./pagination.css"

const pagination = () => {
    return ( 
        <div className="pagination">
            <div className="page previos">Previos</div>
            {[1,2,3,4,5].map(page => (
                <div key={page} className="page">{page}</div>
            ))}
            <div className="page next">Next</div>
        </div>
     );
}
 
export default pagination;