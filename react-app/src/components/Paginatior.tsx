import React from "react";

interface Props {
    imgsPerPage: number;
    totalImgs: number;
    currPage: number;
    paginate: (pageNum: number) => void
}

function Paginatior({ imgsPerPage, totalImgs, currPage, paginate }: Props) {
    const pageNums: number[] = []

    for (let i = 1; i <= Math.ceil(totalImgs / imgsPerPage); i++) {
        pageNums.push(i)
    }

    return (
        <nav>
            <ul className="pagination">
                <li key={-1}>
                    <a className="page-link" href="#" aria-label="Previous"
                        onClick={() => {
                            let pageGoto = currPage - 1
                            if (pageGoto < 1) { pageGoto = 1 }
                            paginate(pageGoto)
                        }}
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {pageNums.map(number => (
                    < React.Fragment key={number} >
                        <li className={`page-item ${number === currPage ? 'active' : ''}`}></li>
                        <a onClick={() => { paginate(number) }} href="!#" className="page-link">{number}</a>
                    </React.Fragment>
                ))}
                <li key={pageNums.length}>
                    <a className="page-link" href="#" aria-label="Previous"
                        onClick={() => {
                            let pageGoto = currPage + 1
                            if (pageGoto > pageNums[pageNums.length - 1]) { pageGoto = pageNums[pageNums.length - 1] }
                            paginate(pageGoto)
                        }}>
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Paginatior