import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '../../components/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/layout/card'
import { Alert, AlertDescription } from '../../../ui/components/alert'
import { CodeBlock } from '../../../ui/components/code-block'
import { InfoIcon, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/docs/zod-pydantic-analogy')({
  component: ZodPydanticAnalogyPage,
})


function ZodPydanticAnalogyPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Docs", href: "/docs" }, { title: "Zod for Pydantic Users" }]}
        pageHeading="Zod for Pydantic Users"
        pageSubheading="A guide to Zod schema validation for those familiar with Python's Pydantic."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">

          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              <strong>TL;DR:</strong> Zod is TypeScript's equivalent to Pydantic - both provide runtime validation with compile-time type inference, but with language-specific APIs and patterns.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Basic Schema Definition</CardTitle>
              <CardDescription>How to define schemas in both libraries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  Simple Models
                  <ArrowRight className="h-4 w-4" />
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Pydantic (Python)</p>
                    <CodeBlock language="python" code={`from pydantic import BaseModel, Field
from typing import Optional

class User(BaseModel):
    id: int
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., pattern=r'^[^@]+@[^@]+\\.[^@]+$')
    age: Optional[int] = Field(None, ge=0, le=150)
    is_active: bool = True

# Usage
user_data = {"id": 1, "name": "John", "email": "john@example.com"}
user = User(**user_data)  # Validates and creates instance`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Zod (TypeScript)</p>
                    <CodeBlock language="typescript" code={`import { z } from "zod"

const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().min(0).max(150).optional(),
  is_active: z.boolean().default(true)
})

type User = z.infer<typeof UserSchema>

// Usage
const userData = { id: 1, name: "John", email: "john@example.com" }
const user = UserSchema.parse(userData)  // Validates and returns typed data`} />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  Nested Objects
                  <ArrowRight className="h-4 w-4" />
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Pydantic (Python)</p>
                    <CodeBlock language="python" code={`class Address(BaseModel):
    street: str
    city: str
    postal_code: str = Field(..., pattern=r'^\\d{5}$')

class User(BaseModel):
    name: str
    address: Address
    tags: list[str] = []

# Usage
data = {
    "name": "John",
    "address": {
        "street": "123 Main St",
        "city": "Boston",
        "postal_code": "02101"
    }
}
user = User(**data)`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Zod (TypeScript)</p>
                    <CodeBlock language="typescript" code={`const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  postal_code: z.string().regex(/^\\d{5}$/)
})

const UserSchema = z.object({
  name: z.string(),
  address: AddressSchema,
  tags: z.array(z.string()).default([])
})

// Usage
const data = {
  name: "John",
  address: {
    street: "123 Main St",
    city: "Boston",
    postal_code: "02101"
  }
}
const user = UserSchema.parse(data)`} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Validation Patterns</CardTitle>
              <CardDescription>Common validation scenarios and error handling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Custom Validation & Refinements</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Pydantic Validators</p>
                    <CodeBlock language="python" code={`from pydantic import BaseModel, field_validator, model_validator

class UserRegistration(BaseModel):
    username: str
    password: str
    confirm_password: str
    
    @field_validator('username')
    def username_alphanumeric(cls, v):
        if not v.isalnum():
            raise ValueError('Username must be alphanumeric')
        return v
    
    @model_validator(mode='after')
    def passwords_match(self):
        if self.password != self.confirm_password:
            raise ValueError('Passwords do not match')
        return self`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Zod Refinements</p>
                    <CodeBlock language="typescript" code={`const UserRegistrationSchema = z.object({
  username: z.string()
    .regex(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric"),
  password: z.string(),
  confirm_password: z.string()
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"], // Error appears on this field
})

// Alternative with superRefine for multiple errors
const schema = z.object({ /* ... */ })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirm_password"]
      })
    }
  })`} />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Error Handling</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Pydantic Errors</p>
                    <CodeBlock language="python" code={`from pydantic import ValidationError

try:
    user = User(name="", email="invalid-email")
except ValidationError as e:
    for error in e.errors():
        print(f"{error['loc']}: {error['msg']}")
    
    # Get formatted error messages
    print(e.json())
    
    # Error structure:
    # [
    #   {
    #     "loc": ["name"],
    #     "msg": "ensure this value has at least 1 characters",
    #     "type": "value_error.any_str.min_length"
    #   }
    # ]`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Zod Errors</p>
                    <CodeBlock language="typescript" code={`import { ZodError } from "zod"

const result = UserSchema.safeParse({
  name: "",
  email: "invalid-email"
})

if (!result.success) {
  const errors = result.error.errors
  for (const error of errors) {
    console.log(\`\${error.path.join('.')}: \${error.message}\`)
  }
  
  // Get formatted errors
  console.log(result.error.format())
  
  // Error structure:
  // [
  //   {
  //     "path": ["name"],
  //     "message": "String must contain at least 1 character(s)",
  //     "code": "too_small"
  //   }
  // ]
} else {
  const validData = result.data // Fully typed!
}`} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Transformation</CardTitle>
              <CardDescription>Converting and preprocessing data during validation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Preprocessing & Transforms</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Pydantic Field Validators</p>
                    <CodeBlock language="python" code={`from pydantic import BaseModel, field_validator
from datetime import datetime

class UserProfile(BaseModel):
    name: str
    created_at: datetime
    
    @field_validator('name', mode='before')
    def name_to_title_case(cls, v):
        if isinstance(v, str):
            return v.title()
        return v
    
    @field_validator('created_at', mode='before')
    def parse_datetime(cls, v):
        if isinstance(v, str):
            return datetime.fromisoformat(v)
        return v

# Usage
data = {
    "name": "john doe",
    "created_at": "2023-01-01T00:00:00"
}
user = UserProfile(**data)
print(user.name)  # "John Doe"`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Zod Transforms</p>
                    <CodeBlock language="typescript" code={`const UserProfileSchema = z.object({
  name: z.string()
    .transform(val => val.trim())
    .transform(val => val.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')),
  created_at: z.string()
    .transform(val => new Date(val))
})

// Or use preprocess for more complex transformations
const schema = z.object({
  name: z.preprocess(
    (val) => typeof val === 'string' ? val.trim().toLowerCase() : val,
    z.string().min(1)
  )
})

// Usage
const data = {
  name: "john doe",
  created_at: "2023-01-01T00:00:00"
}
const user = UserProfileSchema.parse(data)
console.log(user.name)  // "John Doe"`} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}