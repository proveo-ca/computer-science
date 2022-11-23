class Stack {
  items: any[]
  top: any
  length: number
  
  constructor() {
    this.items = []
    this.top = null
    this.length = this.items.length
  }

  getTop() {
    if (this.items.length === 0) {
      return null
    }
    return this.top
  }

  isEmpty() {
    return this.items.length === 0
  }

  size() {
    return this.items.length
  }

  push(element: any) {
    this.items.push(element)
    this.top = element
  }

  pop() {
    if (this.items.length !== 0) {
      if (this.items.length === 1) {
        this.top = null
        return this.items.pop()
      } else {
        this.top = this.items[this.items.length - 2]
        return this.items.pop()
      }

    } else
      return null
  }
}

export { Stack }