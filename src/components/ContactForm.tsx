import * as React from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const body = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setErrorMsg(body.error || "something went wrong");
        setStatus("error");
        setTimeout(() => setStatus("idle"), 8000);
      }
    } catch {
      setErrorMsg("could not reach server — check your connection");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 8000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left lowercase font-mono">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-[10px] text-white uppercase tracking-wider">// name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-1 py-2 bg-transparent border-b border-border/60 text-xs text-text placeholder:text-text-muted focus:outline-none focus:border-white transition-colors"
            placeholder="your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-[10px] text-white uppercase tracking-wider">// email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full px-1 py-2 bg-transparent border-b border-border/60 text-xs text-text placeholder:text-text-muted focus:outline-none focus:border-white transition-colors"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-[10px] text-white uppercase tracking-wider">// subject</label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
            className="w-full px-1 py-2 bg-transparent border-b border-border/60 text-xs text-text placeholder:text-text-muted focus:outline-none focus:border-white transition-colors"
            placeholder="what's this about?"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-[10px] text-white uppercase tracking-wider">// message</label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            rows={4}
            className="w-full px-1 py-2 bg-transparent border-b border-border/60 text-xs text-text placeholder:text-text-muted focus:outline-none focus:border-white transition-colors resize-none"
            placeholder="your message..."
          />
        </div>
      </div>
      
      <div className="pt-2 text-center">
        <button
          type="submit"
          disabled={status === "loading"}
          className="text-accent hover:text-white underline cursor-pointer text-xs font-mono"
        >
          {status === "loading" ? (
            <span>[sending...]</span>
          ) : (
            <span>[send message]</span>
          )}
        </button>
      </div>

      {status === "success" && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] text-green-400 text-center mt-2"
        >
          message sent successfully!
        </motion.p>
      )}
      {status === "error" && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] text-red-400 text-center mt-2"
        >
          {errorMsg}
        </motion.p>
      )}
    </form>
  );
}
