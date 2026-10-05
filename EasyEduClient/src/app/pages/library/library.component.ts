import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const Swal: any;

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  rackNo: string;
  quantity: number;
  available: number;
  publisher: string;
  price: number;
}

interface IssuedRecord {
  id: number;
  bookId: number;
  bookTitle: string;
  memberId: string;
  memberName: string;
  memberType: 'Student' | 'Staff';
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  fine: number;
  status: 'Issued' | 'Returned' | 'Overdue';
}

interface LibraryMember {
  id: string;
  name: string;
  type: 'Student' | 'Staff';
  cardNo: string;
  classOrDept: string;
  booksAllowed: number;
  booksIssued: number;
  status: 'Active' | 'Blocked';
}

interface BookCategory {
  id: number;
  name: string;
  code: string;
  totalBooks: number;
}

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  activeTab: 'catalog' | 'circulation' | 'members' | 'categories' = 'catalog';
  searchTerm = '';
  categoryFilter = 'All';

  books: Book[] = [
    { id: 1, title: 'Concepts of Physics (Vol 1)', author: 'H.C. Verma', isbn: '978-8177091878', category: 'Science & Physics', rackNo: 'RK-102', quantity: 15, available: 11, publisher: 'Bharati Bhawan', price: 450 },
    { id: 2, title: 'Higher Algebra & Coordinate Geometry', author: 'Hall & Knight', isbn: '978-9351441632', category: 'Mathematics', rackNo: 'RK-204', quantity: 20, available: 18, publisher: 'Arihant Publications', price: 380 },
    { id: 3, title: 'Modern Indian History & Polity', author: 'Bipan Chandra', isbn: '978-8125036845', category: 'Social Science', rackNo: 'RK-305', quantity: 12, available: 8, publisher: 'Orient BlackSwan', price: 520 },
    { id: 4, title: 'Computer Science with Python (Class 11 & 12)', author: 'Sumita Arora', isbn: '978-8177002447', category: 'Information Tech', rackNo: 'RK-401', quantity: 25, available: 20, publisher: 'Dhanpat Rai & Co.', price: 650 },
    { id: 5, title: 'Organic Chemistry Structure & Reactivity', author: 'Morrison & Boyd', isbn: '978-0136436690', category: 'Science & Physics', rackNo: 'RK-108', quantity: 10, available: 6, publisher: 'Pearson Education', price: 890 },
    { id: 6, title: 'Wings of Fire - An Autobiography', author: 'Dr. A.P.J. Abdul Kalam', isbn: '978-8173711466', category: 'Biographies & Lit', rackNo: 'RK-502', quantity: 30, available: 24, publisher: 'Universities Press', price: 320 }
  ];

  issuedRecords: IssuedRecord[] = [
    { id: 101, bookId: 1, bookTitle: 'Concepts of Physics (Vol 1)', memberId: 'ADM-2024-001', memberName: 'Aarav Sharma', memberType: 'Student', issueDate: '2025-05-01', dueDate: '2025-05-15', fine: 0, status: 'Issued' },
    { id: 102, bookId: 3, bookTitle: 'Modern Indian History & Polity', memberId: 'ADM-2024-004', memberName: 'Ananya Verma', memberType: 'Student', issueDate: '2025-04-20', dueDate: '2025-05-04', fine: 20, status: 'Overdue' },
    { id: 103, bookId: 4, bookTitle: 'Computer Science with Python', memberId: 'EMP-102', memberName: 'Prof. Rajesh Khanna', memberType: 'Staff', issueDate: '2025-04-10', dueDate: '2025-05-10', fine: 0, status: 'Issued' },
    { id: 104, bookId: 5, bookTitle: 'Organic Chemistry Structure & Reactivity', memberId: 'ADM-2024-002', memberName: 'Diya Patel', memberType: 'Student', issueDate: '2025-04-05', dueDate: '2025-04-19', returnDate: '2025-04-18', fine: 0, status: 'Returned' }
  ];

  members: LibraryMember[] = [
    { id: 'ADM-2024-001', name: 'Aarav Sharma', type: 'Student', cardNo: 'LIB-STU-001', classOrDept: 'Grade 10-A', booksAllowed: 3, booksIssued: 1, status: 'Active' },
    { id: 'ADM-2024-002', name: 'Diya Patel', type: 'Student', cardNo: 'LIB-STU-002', classOrDept: 'Grade 10-B', booksAllowed: 3, booksIssued: 0, status: 'Active' },
    { id: 'ADM-2024-004', name: 'Ananya Verma', type: 'Student', cardNo: 'LIB-STU-004', classOrDept: 'Grade 9-A', booksAllowed: 3, booksIssued: 1, status: 'Active' },
    { id: 'EMP-101', name: 'Dr. Ramesh Sharma', type: 'Staff', cardNo: 'LIB-STF-001', classOrDept: 'Science Dept', booksAllowed: 5, booksIssued: 0, status: 'Active' },
    { id: 'EMP-102', name: 'Prof. Rajesh Khanna', type: 'Staff', cardNo: 'LIB-STF-002', classOrDept: 'Computer Science', booksAllowed: 5, booksIssued: 1, status: 'Active' }
  ];

  categories: BookCategory[] = [
    { id: 1, name: 'Science & Physics', code: 'SCI', totalBooks: 25 },
    { id: 2, name: 'Mathematics', code: 'MATH', totalBooks: 20 },
    { id: 3, name: 'Social Science', code: 'SOC', totalBooks: 12 },
    { id: 4, name: 'Information Tech', code: 'IT', totalBooks: 25 },
    { id: 5, name: 'Biographies & Lit', code: 'LIT', totalBooks: 30 }
  ];

  // Modals state
  showAddBookModal = false;
  newBook: Partial<Book> = {
    title: '',
    author: '',
    isbn: '',
    category: 'Science & Physics',
    rackNo: '',
    quantity: 5,
    publisher: '',
    price: 300
  };

  showIssueModal = false;
  issueForm = {
    memberId: 'ADM-2024-001',
    bookId: 1,
    issueDate: new Date().toISOString().substring(0, 10),
    dueDate: new Date(Date.now() + 14 * 86400000).toISOString().substring(0, 10),
    notes: ''
  };

  showAddCategoryModal = false;
  newCategory = { name: '', code: '' };

  showAddMemberModal = false;
  newMember: Partial<LibraryMember> = {
    id: '',
    name: '',
    type: 'Student',
    classOrDept: 'Grade 10-A',
    booksAllowed: 3
  };

  ngOnInit(): void {}

  get totalBooksCount(): number {
    return this.books.reduce((acc, b) => acc + b.quantity, 0);
  }

  get currentlyIssuedCount(): number {
    return this.issuedRecords.filter(r => r.status === 'Issued' || r.status === 'Overdue').length;
  }

  get overdueCount(): number {
    return this.issuedRecords.filter(r => r.status === 'Overdue').length;
  }

  get filteredBooks(): Book[] {
    return this.books.filter(b => {
      const matchSearch = !this.searchTerm ||
        b.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        b.author.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        b.isbn.includes(this.searchTerm);

      const matchCat = this.categoryFilter === 'All' || b.category === this.categoryFilter;
      return matchSearch && matchCat;
    });
  }

  saveBook(): void {
    if (!this.newBook.title || !this.newBook.author) {
      Swal.fire('Required Fields', 'Please enter Book Title and Author Name.', 'warning');
      return;
    }

    const book: Book = {
      id: this.books.length + 1,
      title: this.newBook.title!,
      author: this.newBook.author!,
      isbn: this.newBook.isbn || `978-81-${Math.floor(1000000 + Math.random() * 9000000)}`,
      category: this.newBook.category || 'General',
      rackNo: this.newBook.rackNo || 'RK-101',
      quantity: Number(this.newBook.quantity) || 5,
      available: Number(this.newBook.quantity) || 5,
      publisher: this.newBook.publisher || 'National Publishers',
      price: Number(this.newBook.price) || 350
    };

    this.books.unshift(book);
    this.showAddBookModal = false;
    this.newBook = { title: '', author: '', isbn: '', category: 'Science & Physics', rackNo: '', quantity: 5, publisher: '', price: 300 };

    Swal.fire('Book Cataloged', 'New book title added to library repository.', 'success');
  }

  openIssueModal(book?: Book): void {
    if (book) {
      this.issueForm.bookId = book.id;
    }
    this.showIssueModal = true;
  }

  submitIssueBook(): void {
    const book = this.books.find(b => b.id === Number(this.issueForm.bookId));
    const member = this.members.find(m => m.id === this.issueForm.memberId);

    if (!book || book.available <= 0) {
      Swal.fire('Unavailable', 'No copies of this book are currently available in the rack.', 'error');
      return;
    }

    if (!member) {
      Swal.fire('Member Not Found', 'Please select a valid library member.', 'warning');
      return;
    }

    book.available -= 1;
    member.booksIssued += 1;

    const newRecord: IssuedRecord = {
      id: 100 + this.issuedRecords.length + 1,
      bookId: book.id,
      bookTitle: book.title,
      memberId: member.id,
      memberName: member.name,
      memberType: member.type,
      issueDate: this.issueForm.issueDate,
      dueDate: this.issueForm.dueDate,
      fine: 0,
      status: 'Issued'
    };

    this.issuedRecords.unshift(newRecord);
    this.showIssueModal = false;
    this.activeTab = 'circulation';

    Swal.fire({
      title: 'Book Issued!',
      text: `"${book.title}" has been issued to ${member.name}. Due on ${this.issueForm.dueDate}.`,
      icon: 'success',
      confirmButtonColor: '#002B49'
    });
  }

  returnBook(record: IssuedRecord): void {
    Swal.fire({
      title: 'Confirm Book Return?',
      text: `Mark "${record.bookTitle}" as returned from ${record.memberName}? ${record.fine > 0 ? 'Collect fine of ₹' + record.fine : ''}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      confirmButtonText: 'Yes, Return Book'
    }).then((res: any) => {
      if (res.isConfirmed) {
        record.status = 'Returned';
        record.returnDate = new Date().toISOString().substring(0, 10);

        const book = this.books.find(b => b.id === record.bookId);
        if (book) book.available += 1;

        const member = this.members.find(m => m.id === record.memberId);
        if (member && member.booksIssued > 0) member.booksIssued -= 1;

        Swal.fire('Book Returned', 'The book has been marked returned and inventory updated.', 'success');
      }
    });
  }

  saveCategory(): void {
    if (!this.newCategory.name || !this.newCategory.code) {
      Swal.fire('Missing Fields', 'Please fill Category Name and Code.', 'warning');
      return;
    }

    this.categories.push({
      id: this.categories.length + 1,
      name: this.newCategory.name,
      code: this.newCategory.code.toUpperCase(),
      totalBooks: 0
    });

    this.showAddCategoryModal = false;
    this.newCategory = { name: '', code: '' };
    Swal.fire('Category Added', 'New library book category created.', 'success');
  }

  saveMember(): void {
    if (!this.newMember.name || !this.newMember.id) {
      Swal.fire('Missing Fields', 'Please fill Member ID and Name.', 'warning');
      return;
    }

    const member: LibraryMember = {
      id: this.newMember.id!,
      name: this.newMember.name!,
      type: this.newMember.type || 'Student',
      cardNo: `LIB-${this.newMember.type === 'Staff' ? 'STF' : 'STU'}-${Math.floor(100 + Math.random() * 900)}`,
      classOrDept: this.newMember.classOrDept || 'General',
      booksAllowed: Number(this.newMember.booksAllowed) || 3,
      booksIssued: 0,
      status: 'Active'
    };

    this.members.push(member);
    this.showAddMemberModal = false;
    this.newMember = { id: '', name: '', type: 'Student', classOrDept: 'Grade 10-A', booksAllowed: 3 };

    Swal.fire('Member Enrolled', 'New library member card issued.', 'success');
  }
}
