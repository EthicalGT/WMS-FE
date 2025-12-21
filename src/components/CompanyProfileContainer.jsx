import React, { useState } from "react";
import "../assets/css/CompanyProfileContainer.css";
import {
    Building2,
    MapPin,
    Phone,
    Mail,
    Edit2,
    Menu,
    X
} from "lucide-react";

function CompanyProfile() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="app-layout">
            {/* Sidebar */}
            <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
                <div className="logo">HMS</div>

                <nav className="menu">
                    <div className="menu-item">Dashboard</div>
                    <div className="menu-item active">Company Profile</div>
                    <div className="menu-item">Product Catalog</div>
                    <div className="menu-item">Purchase Orders</div>
                    <div className="menu-item">Supply & Delivery</div>
                    <div className="menu-item">Inventory Summary</div>
                    <div className="menu-item">Payments & Invoices</div>
                    <div className="menu-item">Notifications</div>
                    <div className="menu-item">Support / Messages</div>
                    <div className="menu-item">Settings</div>
                </nav>

                <div className="logout">Logout</div>
            </aside>

            {/* Main */}
            <main className="main">
                {/* Topbar */}
                <header className="topbar">
                    {/* Hamburger */}
                    <button
                        className="hamburger-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <Menu size={22} />
                    </button>


                    <h1>Company Profile</h1>

                    <div className="user-info">
                        <span>Fresh Farms</span>

                    </div>
                </header>

                <section className="profile-card">
                    <div className="profile-header">
                        <div className="company-info">
                            <div className="company-icon">
                                <Building2 />
                            </div>
                            <div>
                                <h2>Fresh Farms Pvt Ltd</h2>
                                <p>Premium Agricultural Products Supplier</p>
                            </div>
                        </div>

                        <button className="edit-btn">
                            <Edit2 size={16} /> Edit Profile
                        </button>
                    </div>

                    <div className="profile-content">
                        <div>
                            <div className="field">
                                <label>Business Name</label>
                                <input value="Fresh Farms Pvt Ltd" readOnly />
                            </div>

                            <div className="field">
                                <label>GST Number</label>
                                <input value="27AABCT1234D1ZH" readOnly />
                            </div>

                            <div className="field">
                                <label><Phone size={16} /> Contact Number</label>
                                <input value="+91 98765 43210" readOnly />
                            </div>

                            <div className="field">
                                <label><Mail size={16} /> Email Address</label>
                                <input value="contact@freshfarms.in" readOnly />
                            </div>
                        </div>

                        <div>
                            <div className="field">
                                <label><MapPin size={16} /> Business Address</label>
                                <textarea
                                    readOnly
                                    value="Plot 45, Industrial Area, Sector 12, Pune, Maharashtra - 411057"
                                />
                            </div>

                            <div className="field">
                                <label>Product Categories Supplied</label>
                                <div className="tags">
                                    <span>Fresh Vegetables</span>
                                    <span>Fruits</span>
                                    <span>Dairy Products</span>
                                    <span>Grains & Pulses</span>
                                    <span>Spices</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default CompanyProfile;
