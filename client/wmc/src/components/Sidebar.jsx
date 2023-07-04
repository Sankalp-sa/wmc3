import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {

    return (
        <>
            <div className="d-flex flex-column flex-shrink-0" style={{ width: '4.5rem' }}>
                <a href="/" className="d-block p-3 link-dark text-decoration-none" title data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
                    <svg className="bi" width={40} height={32}><use xlinkHref="#bootstrap" /></svg>
                    <span className="visually-hidden">Icon-only</span>
                </a>
                <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                    <li>
                        <Link to="/species" className="nav-link py-3 border-bottom">
                            Species
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/books" className="nav-link py-3 border-bottom">
                            Books
                        </Link>
                    </li>
                    <li>
                        <Link to="/characters" className="nav-link py-3 border-bottom">
                            Characters
                        </Link>
                    </li>
                    <li>
                        <Link to="/spells" className="nav-link py-3 border-bottom">
                            Spells
                        </Link>
                    </li>
                    <li>
                        <Link to="/houses" className="nav-link py-3 border-bottom">
                            Houses
                        </Link>
                    </li>
                    <li>
                        <Link to="/wands" className="nav-link py-3 border-bottom">
                            Wands
                        </Link>
                    </li>
                </ul>
            </div>

        </>
    )
}
