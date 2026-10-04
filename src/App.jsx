
import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import './App.css'

function App() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const sheetUrl = import.meta.env.VITE_GOOGLE_SHEET_CSV_URL

    if (!sheetUrl) {
      setError('Google Sheet URL is not configured.')
      setLoading(false)
      return
    }

    Papa.parse(sheetUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        try {
          const formattedJobs = results.data
            .filter((row) => {
              return (
                row['Job Name']?.trim() &&
                row['Active']?.trim().toUpperCase() === 'YES'
              )
            })
            .map((row, index) => ({
              id: index + 1,
              name: row['Job Name'].trim(),
              link: row['Link']?.trim() || '',
              skills: row['Skills']?.trim() || 'Not specified',
              pay: row['Pay']?.trim() || 'Not specified',
            }))

          setJobs(formattedJobs)
          setLoading(false)
        } catch {
          setError('Unable to process job data. Please check your Google Sheet.')
          setLoading(false)
        }
      },

      error: () => {
        setError('Unable to load jobs. Please try again later.')
        setLoading(false)
      },
    })
  }, [])

  const isValidLink = (link) => {
    try {
      const url = new URL(link)
      return url.protocol === 'https:' || url.protocol === 'http:'
    } catch {
      return false
    }
  }

  return (
    <div className="website">

      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <a href="/" className="logo">
            <span className="teddy-icon">🧸</span>
            Kucchu Pucchu <strong>JOBS</strong>
          </a>

          <a href="#about" className="nav-link">
            About
          </a>
        </div>
      </header>

      <main className="container">

        {/* Intro */}
        <section className="intro">

          <div className="intro-content">

            <div className="intro-tag">
              A LITTLE HELP WITH THE JOB HUNT
            </div>

            <h1>
              Finding a job is stressful.
              <br />
              <span>Finding one shouldn't be.</span>
            </h1>

            <p>
              Kucchu Pucchu Jobs brings together genuine job and
              referral opportunities in one simple place.
              No unnecessary noise. No complicated searching.
            </p>

          </div>

          <div className="teddy-card">
            <div className="teddy-face">🧸</div>

            <p>
              Take a breath.
              <br />
              Your Job hunt could be END here.
            </p>
          </div>

        </section>

        {/* Jobs */}
        <section className="jobs-section">

          <div className="section-heading">

            <div>
              <div className="section-label">OPENINGS</div>

              <h2>Current Opportunities</h2>

              <p>
                Have a look. Maybe something catches your eye.
              </p>
            </div>

            <span className="job-count">
              {loading ? 'Loading...' : `${jobs.length} Listings`}
            </span>

          </div>

          <div className="table-wrapper">
            <div className="jobs-scroll">

            
            <table>

              <thead>
                <tr>
                  <th>JOB NAME</th>
                  <th>REQUIRED SKILLS</th>
                  <th>PAY</th>
                </tr>
              </thead>

              <tbody>

                {loading && (
                  <tr>
                    <td colSpan="3" className="status-message">
                      🧸 Fetching opportunities for you...
                    </td>
                  </tr>
                )}

                {!loading && error && (
                  <tr>
                    <td colSpan="3" className="status-message error-message">
                      {error}
                    </td>
                  </tr>
                )}

                {!loading && !error && jobs.length === 0 && (
                  <tr>
                    <td colSpan="3" className="status-message">
                      🧸 No active openings right now. Check back soon!
                    </td>
                  </tr>
                )}

                {!loading && !error && jobs.map((job) => (

                  <tr key={job.id}>

                    <td>
                      {isValidLink(job.link) ? (
                        <a
                          href={job.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="job-link"
                        >
                          {job.name}
                          <span className="arrow">↗</span>
                        </a>
                      ) : (
                        <span className="job-name">
                          {job.name}
                        </span>
                      )}
                    </td>

                    <td className="skills">
                      {job.skills}
                    </td>

                    <td>
                      <span className="pay">
                        {job.pay}
                      </span>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
            </div>
          </div>

          <p className="preview-note">
            Kucchu Pucchu ❤️ Aap stress mat lo new remote jobs aate hi hum update kar denge💛.
          </p>

        </section>

        {/* Note */}
        <section className="little-note">

          <div className="note-bear">🧸</div>

          <div>
            <h3>Job searching can be exhausting.</h3>

            <p>
              Isliye Kucchu Pucchu Aapko stress na ho isliye isko simple banaya hai ⸜(｡˃ ᵕ ˂ )⸝♡ .Kucchu pucchu Aap Hydarate raho pani piyo 🫗 Okies. 
            </p>
          </div>

        </section>

        {/* About */}
        <section className="about" id="about">

          <div className="section-label">ABOUT</div>

          <h2>What is Kucchu Pucchu Jobs?</h2>

          <p>
            An independent platform sharing remote part time, full time job opportunities
            collected from different legitimate sources. 
          </p>

        </section>

      </main>

      {/* Footer */}
      <footer className="footer">

        <div className="container footer-content">

          <span>🧸 Kucchu Pucchu JOBs</span>

          <span>Kucchu Pucchu Take Care</span>

        </div>

      </footer>

    </div>
  )
}

export default App
