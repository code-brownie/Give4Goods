import React from 'react'
import '../style/about.css'
const About = () => {
    return (
        <main className="main-content">
            <section className="section">
                <h2 className="section-title">Our Story</h2>
                <p className="section-text">
                    Welcome to Give4Good, your destination for sustainable shopping and charitable donations. We promote responsible consumption, where you can make a positive impact on the environment and support those in need.
                </p>
                <p className="section-text">
                    At Give4Good, we believe every purchase can make a difference. Our website allows you to buy new products and donate your used items, extending product lifecycles, reducing waste, and contributing to a sustainable future.
                </p>
                <div className="subsection">
                    <h3 className="subsection-title">How it works:</h3>
                    <ul className="subsection-list">
                        <li className="subsection-item">Buy and Give: Browse our wide selection of new products and select the option to return your old item during checkout. Our platform ensures the legitimacy of listed products.</li>
                        <li className="subsection-item">Donation: If you don't intend to buy new products, you can directly donate your used items. Every donation matters and can bring joy to someone in need.</li>
                    </ul>
                </div>
                <div className="subsection">
                    <h3 className="subsection-title">The Impact:</h3>
                    <p className="subsection-text">
                        Through our platform, we support individuals and families in need, NGOs, and local communities by facilitating the donation of functional items. We also contribute to reducing environmental waste by properly recycling non-functional items. Our revenue from recycling helps enhance the user experience on our website.
                    </p>
                </div>
                <p className="section-text">
                    Join us on our mission to make a difference. Whether you choose to buy, donate, or both, every action counts. Together, we can build a more sustainable and compassionate world.
                </p>
            </section>

            <section className="section">
                <h2 className="section-title">Our Team</h2>
                <ul className="team-list">
                    <li className="team-member">Aman Kumar</li>
                    <li className="team-member">Abhishek Porwal</li>
                    <li className="team-member">Abhinav Pandey</li>
                    <li className="team-member">Pratyush Ghatole</li>
                </ul>
            </section>
        </main>

    )
}

export default About