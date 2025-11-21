import React, { useState } from 'react'

export default function App(){

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try{
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if(res.ok){
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch(err){
      setStatus('error')
    }
  }

  // ⭐ Your real project list
  const projects = [
    {
      title: 'Microfinance Loan Approval Prediction System',
      desc: 'Machine learning + deep learning system predicting loan approval using borrower profiles.',
      tech: ['Python','TensorFlow','XGBoost','Pandas'],
      demo: '#',
      code: 'https://github.com/Nadun00'
    },
    {
      title: 'Inventory Management System – Dental Clinic',
      desc: 'Full-stack application for managing dental clinic inventory with CRUD operations.',
      tech: ['React','Node','Express','MongoDB'],
      demo: '#',
      code: 'https://github.com/Nadun00'
    },
    {
      title: 'AuraLink – IoT Environment System',
      desc: 'IoT system generating quotes, displaying sensor data, and sending email summaries.',
      tech: ['IoT','APIs','Python / Node','Automation'],
      demo: '#',
      code: 'https://github.com/Nadun00'
    },
    {
      title: 'Smart Glasses – Vision Assistance Research',
      desc: 'Research on reducing delay in object detection & audio feedback for visually impaired users.',
      tech: ['Computer Vision','Python','Raspberry Pi (optional)'],
      demo: '#',
      code: 'https://github.com/Nadun00'
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* HEADER */}
      <header className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold">Nadun</h1>
        <p className="mt-2 text-slate-600">
          IT Undergraduate • MERN Stack • Deep Learning & IoT Projects
        </p>
      </header>

      {/* MAIN */}
      <main className="max-w-4xl mx-auto p-6">

        {/* PROJECTS */}
        <section id="projects" className="mt-6">
          <h2 className="text-2xl font-semibold">Projects</h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {projects.map((p,i)=> (
              <article key={i} className="p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="text-sm mt-1">{p.desc}</p>
                <p className="mt-2 text-xs text-slate-500">{p.tech.join(' • ')}</p>

                <div className="mt-3 flex gap-3">
                  <a href={p.demo} className="text-sm underline">Demo</a>
                  <a href={p.code} className="text-sm underline">Code</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-10">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <form className="mt-4 space-y-3" onSubmit={handleSubmit}>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full p-2 border rounded"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              className="w-full p-2 border rounded"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              className="w-full p-2 border rounded h-28"
            />

            <div className="flex items-center gap-3">
              <button
                className="px-4 py-2 rounded bg-sky-600 text-white"
                type="submit"
              >
                Send
              </button>

              <p className="text-sm text-slate-500">
                {status === 'sending'
                  ? 'Sending...'
                  : status === 'sent'
                  ? 'Thanks — message sent!'
                  : status === 'error'
                  ? 'Error sending message'
                  : ''}
              </p>
            </div>

          </form>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="p-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Nadun — 
        <span className="underline ml-1">GitHub</span> • 
        <span className="underline ml-1">LinkedIn</span>
      </footer>
    </div>
  )
}
