"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../../services/usuarioService"
import Input from "../Input"
import { Link } from "react-router-dom"
import {Eye, EyeOff, Shield, ShieldAlert, ShieldCheck, Lock, Shuffle } from "lucide-react"
import "./FormRegister.css"

const securityQuestionsByTheme = {
  personal: {
    name: "Personal",
    icon: "👤",
    color: "#00b4a0",
    questions: [
      "¿Cuál es el nombre de tu primera mascota?",
      "¿En qué ciudad naciste?",
      "¿Cuál es el nombre de tu mejor amigo de la infancia?",
      "¿Cuál fue tu primer trabajo?",
      "¿Cuál es el segundo nombre de tu madre?",
    ],
    securityLevel: "medio",
  },
  preferencias: {
    name: "Preferencias",
    icon: "❤️",
    color: "#e91e63",
    questions: [
      "¿Cuál es tu comida favorita?",
      "¿Cuál es tu película favorita?",
      "¿Cuál es tu canción favorita de todos los tiempos?",
      "¿Cuál es tu destino de viaje soñado?",
      "¿Cuál es tu pasatiempo favorito?",
    ],
    securityLevel: "bajo",
  },
  educacion: {
    name: "Educación",
    icon: "🎓",
    color: "#3f51b5",
    questions: [
      "¿Cómo se llamaba tu escuela primaria?",
      "¿Quién fue tu profesor favorito?",
      "¿Qué título universitario obtuviste primero?",
      "¿En qué año te graduaste de la escuela secundaria?",
      "¿Cuál fue tu materia favorita en la escuela?",
    ],
    securityLevel: "medio",
  },
  historia: {
    name: "Historia Personal",
    icon: "📜",
    color: "#ff9800",
    questions: [
      "¿Cuál fue el nombre de tu primer jefe?",
      "¿Cuál fue la marca de tu primer automóvil?",
      "¿En qué calle vivías cuando tenías 10 años?",
      "¿Cuál fue el nombre del primer concierto al que asististe?",
      "¿Dónde conociste a tu pareja/mejor amigo?",
    ],
    securityLevel: "alto",
  },
  familia: {
    name: "Familia",
    icon: "👪",
    color: "#4caf50",
    questions: [
      "¿Cuál es el segundo nombre de tu padre?",
      "¿En qué ciudad nació tu madre?",
      "¿Cuál es el mes y día de nacimiento de tu hermano/a mayor?",
      "¿Cuál es el apellido de soltera de tu abuela materna?",
      "¿Cuál es el nombre de tu primo/a mayor?",
    ],
    securityLevel: "alto",
  },
}

const allowedSpecialChars = "@$!%*?&/"

const FormRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    question: "",
    answer: "",
  })
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [answerError, setAnswerError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [selectedTheme, setSelectedTheme] = useState<string>("personal");
  const [securityLevel, setSecurityLevel] = useState<string>("medio");
  const navigate = useNavigate();

  function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  }

  const passwordRegex = new RegExp(`^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[${escapeRegExp(allowedSpecialChars)}]).{8,}$`);

  useEffect(() => {
    generateRandomQuestion(selectedTheme)
  }, [])

  useEffect(() => {
    validateForm()
  }, [formData, answerError, passwordError, emailError, phoneError, nameError]);

  const generateRandomQuestion = (theme: string) => {
    const themeQuestions = securityQuestionsByTheme[theme as keyof typeof securityQuestionsByTheme].questions
    const randomIndex = Math.floor(Math.random() * themeQuestions.length)
    const randomQuestion = themeQuestions[randomIndex]
    setFormData((prev) => ({
      ...prev,
      question: randomQuestion,
    }))
    setSecurityLevel(securityQuestionsByTheme[theme as keyof typeof securityQuestionsByTheme].securityLevel)
  }

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value
    setSelectedTheme(newTheme)
    generateRandomQuestion(newTheme)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (name === "password") {
      validatePassword(value)
    }
    if (name === "answer") {
      validateAnswer(value)
    }
    if (name === "email") {
      validateEmail(value);
    }
    if (name === "phone") {
      validatePhone(value);
    }
    if (name === "name") {
      validateName(value);
    }
  };

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError("El correo electrónico no puede estar vacío")
      return
    }
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailError(emailValid ? "" : "El correo electrónico no es válido");
  };

  const validatePhone = (phone: string) => {
    if (!phone) {
      setPhoneError("El teléfono no puede estar vacío")
      return
    }
    if (phone.length <10) {
      setPhoneError("El teléfono debe tener al menos 10 dígitos")
      return
    }
    const phoneValid = /^[0-9]{10,15}$/.test(phone);
    setPhoneError(phoneValid ? "" : "El teléfono debe contener entre 8 y 15 dígitos");
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Ingresa una contraseña")
      return
    }
    const errors = []
    if (password.length < 8) {
      errors.push("al menos 8 caracteres")
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("una letra mayúscula")
    }
    if (!/[a-z]/.test(password)) {
      errors.push("una letra minúscula")
    }
    if (!/[0-9]/.test(password)) {
      errors.push("un número")
    }
    const specialCharsRegex = new RegExp(`[${escapeRegExp(allowedSpecialChars)}]`)
    if (!specialCharsRegex.test(password)) {
      errors.push(`un símbolo (${allowedSpecialChars.split("").join(" ")})`)
    }
    setPasswordError(errors.length > 0 ? `La contraseña debe contener: ${errors.join(", ")}` : "")
  }

  const validateName = (name: string) => {
    if (!name) {
      setNameError("El nombre no puede estar vacío")
      return;
    }
    const nameValid = name.trim().length >= 3;
    setNameError(nameValid ? "" : "El nombre debe tener al menos 3 caracteres");
  };

  const validateAnswer = (answer: string) => {
    if (!answer) {
      setAnswerError("La respuesta de seguridad no puede estar vacía")
      return
    }
    if (answer.trim().length < 4) {
      setAnswerError("La respuesta debe tener al menos 4 caracteres")
    } else {
      setAnswerError("")
    }
  }

  const validateForm = () => {
    const { name, phone, email, password, question, answer } = formData
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const phoneValid = /^[0-9]{8,15}$/.test(phone)
    const nameValid = name.trim().length >= 3
    const questionValid = question.trim().length > 0
    const answerValid = answer.trim().length >= 5
    const passwordValid = passwordRegex.test(password)
    
    setIsFormValid(
      emailValid &&
      phoneValid &&
      nameValid &&
      questionValid &&
      answerValid &&
      passwordValid &&
      !passwordError &&
      !answerError &&
      !emailError &&
      !phoneError &&
      !nameError 
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")
    setIsSubmitting(true)
    
    // Validar todos los campos antes de enviar
    validateName(formData.name);
    validatePhone(formData.phone);
    validateEmail(formData.email);
    validatePassword(formData.password);
    validateAnswer(formData.answer);
    
    validateForm()
    
    if (!isFormValid) {
      setErrorMessage("Por favor completa todos los campos correctamente")
      setIsSubmitting(false)
      return
    }
    
    try {
      const newUser = {
        correo: formData.email,
        contra: formData.password,
        pregunta: formData.question,
        respuesta: formData.answer,
        nombre: formData.name,
        telefono: formData.phone,
      }
      await registerUser(newUser)
      setSuccessMessage("Registrado correctamente. Redirigiendo...")
      setFormData({
        name: "",
        phone: "",
        email: "",
        password: "",
        question: "",
        answer: "",
      });
      setTimeout(() => {
        navigate("/") 
      }, 2000)
    } catch (error: any) {
      console.error("Error en registro:", error)
      setErrorMessage(error?.response?.data?.message || "Error al registrar el usuario. Por favor intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Renderizar el icono de nivel de seguridad
  const renderSecurityLevelIcon = () => {
    switch (securityLevel) {
      case "bajo":
        return <ShieldCheck size={20} className="security-icon low" />
      case "medio":
        return <Shield size={20} className="security-icon medium" />
      case "alto":
        return <ShieldAlert size={20} className="security-icon high" />
      default:
        return <Shield size={20} className="security-icon medium" />
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-register animate-fade-in">
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
      <div className="form-group">
        <Input
          label="Nombre:"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          minLength={3}
        />
        {nameError && <div className="field-error">{nameError}</div>}
      </div>
      
      <div className="form-group">
        <Input
          label="Teléfono:"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          pattern="[0-9]{8,15}"
          title="Mínimo 10 dígitos, solo números"
        />
        {phoneError && <div className="field-error">{phoneError}</div>}
      </div>
      
      <div className="form-group">
        <Input 
          label="Correo:" 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        {emailError && <div className="field-error">{emailError}</div>}
      </div>
      
      <div className="form-group security-theme-group">
        <div className="question-header">
          <label>Tema de pregunta de seguridad:</label>
        </div>
        <select
          name="securityTheme"
          value={selectedTheme}
          onChange={handleThemeChange}
          className={`theme-selector ${securityLevel}`}
        >
          {Object.entries(securityQuestionsByTheme).map(([key, theme]) => (
            <option key={key} value={key} className="theme-option">
              {theme.icon} {theme.name}
            </option>
          ))}
        </select>
        <div className={`security-level ${securityLevel}`}>
          {renderSecurityLevelIcon()}
          <span className={`level-text ${securityLevel}`}>
            Nivel de seguridad: {securityLevel.charAt(0).toUpperCase() + securityLevel.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="form-group">
        <div className="question-container">
          <label>Pregunta de seguridad:</label>
          <button
            type="button"
            onClick={() => generateRandomQuestion(selectedTheme)}
            title="Generar otra pregunta aleatoria"
          >
            <Shuffle size={16} />
          </button>
        </div>
        <div className="selected-question">
          <span className="question-theme-icon">
            {securityQuestionsByTheme[selectedTheme as keyof typeof securityQuestionsByTheme].icon}
          </span>
          <span className="question-text">{formData.question}</span>
        </div>
      </div>
      
      <div className="form-group">
        <div className="answer-header">
          <label>Respuesta:</label>
          <button 
            type="button" 
            className="toggle-answer-visibility" 
            onClick={() => setShowAnswer(!showAnswer)}
            title={showAnswer ? "Ocultar respuesta" : "Mostrar respuesta"}
          >
            {showAnswer ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <div className="secret-input-container">
          <input
            type={showAnswer ? "text" : "password"}
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            required
            minLength={4}
            className="secret-input"
          />
        </div>
        <div className="secret-mode-indicator">
          <Lock size={14} />
          <span>Modo secreto {showAnswer ? "desactivado" : "activado"}</span>
        </div>
        {answerError && <div className="field-error">{answerError}</div>}
      </div>
      
      <div className="form-group">
        <div className="answer-header">
          <label>Contraseña:</label>
          <button 
            type="button" 
            className="toggle-answer-visibility" 
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <div className="secret-input-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="secret-input"
          />
        </div>
        {passwordError && <div className="field-error">{passwordError}</div>}
        <div className="password-requirements">
          <p>La contraseña debe contener:</p>
          <ul>
            <li className={formData.password.length >= 8 ? "valid" : ""}>Mínimo 8 caracteres</li>
            <li className={/[A-Z]/.test(formData.password) ? "valid" : ""}>Al menos una mayúscula</li>
            <li className={/[a-z]/.test(formData.password) ? "valid" : ""}>Al menos una minúscula</li>
            <li className={/[0-9]/.test(formData.password) ? "valid" : ""}>Al menos un número</li>
            <li className={new RegExp(`[${escapeRegExp(allowedSpecialChars)}]`).test(formData.password) ? "valid" : ""}>
              Al menos un símbolo ({allowedSpecialChars.split("").join(" ")})
            </li>
          </ul>
        </div>
      </div>
      
      <button type="submit" disabled={!isFormValid || isSubmitting}>
        {isSubmitting ? (
          <>
            <span className="loading-spinner"></span>
            Registrando...
          </>
        ) : (
          "Registrar"
        )}
      </button>
      
      <div className="login-link">
        <p>
          ¿Ya tienes una cuenta? <Link to="/">Inicia sesión</Link>
        </p>
      </div>
    </form>
  )
}

export default FormRegister