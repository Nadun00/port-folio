import React, { useState } from 'react'

export default function App() {
    const [form, setForm] = useState ({name: '', email: '', message: '' })
    const [status, setStatus] = useState('')

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('Sending...')
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })
            if (response.ok) {
                setStatus('Message sent successfully!')
                setForm({ name: '', email: '', message: '' })
            } else {
                setStatus('Failed to send message.')
            }
        } catch (err) {
            console.error(err)
            setStatus('Failed to send message.')
        }
    }

    const projects = [
        {
            title: 'Task Manager (MERN)',
            desc: 'A simple tasks app with auth (JWT) and realtime-like updates.',
            tech: ['React','Node','Express','MongoDB'],
            demo: '#',
            code: '#'
        },
        {
            title: 'Personal Blog',
            desc: 'Static blog built with Markdown + Mongo for comments.',
            tech: ['React','Markdown','MongoDB'],
            demo: '#',
            code: '#'
        }
    ]

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <header className="max-w-4xl mx-auto p-6">
                <h1 className="text-4xl font-bold">Your Name</h1>
                <p className="mt-2 text-slate-600">IT undergraduate • MERN stack • Building practical apps</p>
            </header>
            <main className="max-w-4xl mx-auto p-6">
                <section id="projects" className="mt-6">
                    <h2 className="text-2xl font-semibold">Projects</h2>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        {projects.map((p,i) => (
                            <div key={i} className="p-4 border rounded bg-white">
                                <h3 className="font-semibold">{p.title}</h3>
                                <p className="text-sm text-slate-600">{p.desc}</p>
                                <div className="mt-2 text-xs text-slate-500">{p.tech.join(' • ')}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="contact" className="mt-8">
                    <h2 className="text-2xl font-semibold">Contact</h2>
                    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
                        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
                        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" />
                        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="w-full p-2 border rounded" />
                        <button type="submit" className="px-4 py-2 bg-slate-800 text-white rounded">Send</button>
                        <div className="text-sm text-slate-600">{status}</div>
                    </form>
                </section>
            </main>
        </div>
    )
}

