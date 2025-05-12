import { BookOpen, ExternalLink } from "lucide-react"
import Link from "next/link"

interface LegalReferencesProps {
  references: string[]
  className?: string
  linkUrl?: string
}

export function LegalReferences({ references, className = "", linkUrl = "/legislacao" }: LegalReferencesProps) {
  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-md p-3 ${className}`}>
      <div className="flex items-start">
        <BookOpen className="text-blue-600 mr-2 mt-0.5" size={18} />
        <div>
          <p className="text-sm font-medium text-gray-800 flex items-center">
            Base Legal:
            <Link href={linkUrl} className="ml-2 text-xs text-blue-600 hover:underline flex items-center">
              Consultar legislação
              <ExternalLink size={10} className="ml-1" />
            </Link>
          </p>
          <ul className="mt-1 space-y-1">
            {references.map((reference, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-start">
                <span className="text-blue-600 mr-1">•</span>
                {reference}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
