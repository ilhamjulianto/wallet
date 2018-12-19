import React, { Component } from 'react'
import './transaction.css'
import WOW from 'wowjs'
import Ink from 'react-ink'
import { Dialog, DialogTitle, DialogContent, Slide, InputAdornment, MenuItem, TextField, Snackbar } from '@material-ui/core'
import 'react-infinite-calendar/styles.css'
import TypeIcon from '@material-ui/icons/MonetizationOn'
import CategoryIcon from '@material-ui/icons/Apps'
import AmountIcon from '@material-ui/icons/AttachMoney'
import NoteIcon from '@material-ui/icons/Create'
import DateIcon from '@material-ui/icons/DateRange'
import Account from '@material-ui/icons/AccountCircle'
import axios from 'axios'

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

export default class index extends Component {
    state = {
        data: [
            {
                type: 'Expense',
                category: 'Family',
                amount: 50000,
                note: 'Mineral Water',
                date: '2018-18-12',
                user: 'John',
            },
            {
                type: 'Income',
                category: 'Gift',
                amount: 80000,
                note: 'Gift',
                date: '2018-18-12',
                user: 'Mareth',
            },
            {
                type: 'Expense',
                category: 'Sport',
                amount: 400000,
                note: 'Basketball',
                date: '2018-18-12',
                user: 'Dhine',
            },
        ],
        type: '',
        category: '',
        amount: '',
        note: '',
        date: '',
        user: '',
        typeUpdate: '',
        categoryUpdate: '',
        amountUpdate: '',
        noteUpdate: '',
        dateUpdate: '',
        userUpdate: '',
        open: false,
        openDetail: false,
        openSuc: false,
        index: '',
        token: '',
    }

    componentDidMount() {
        new WOW.WOW().init()
        this.setState({
            token: localStorage.getItem('token')
        })
    }

    today = () => {
        var today = new Date()
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return(
            months[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear()
        )
    }

    handleClose = () => {
        this.setState({
            open: false,
        })
    }

    handleOpen = () => {
        this.setState({
            open: true,
        })
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
      };

    handleDateChange = (date) => {
        this.setState({
            date
        })
    }

    handleCloseDetail = () => {
        this.setState({
            openDetail: false,
        })
    }

    handleCloseSuc = () => {
        this.setState({ openSuc : false })
    }

    handleOpenDetail = (i) => {
        var datas = this.state.data
        this.setState({
            index: i,
            openDetail: true,
            typeUpdate: datas[i].type,
            categoryUpdate: datas[i].category,
            amountUpdate: datas[i].amount,
            noteUpdate: datas[i].note,
            dateUpdate: datas[i].date,
            userUpdate: datas[i].user,
        })
    }

    handleAddTrans = (e) => {
        e.preventDefault()

        const { type, category, amount, note, date, user, token } = this.state
        var datas = {
            'type': type,
            'category': category,
            'amount': type === 'Expense' ? '-' + amount : '+' + amount,
            'note': note,
            'date': date,
            'user': user,
        }

        axios.post(`https://api-v1-superwallet.herokuapp.com/api/v1/transactions?token=${token}`, datas).then(res => {
            console.log(res)
            this.setState({
                // data,
                open: false,
                openSuc: true,
            })
        })
    }

  render() {
      const { data, open, type, category, amount, note, date, user, typeUpdate, categoryUpdate, amountUpdate, noteUpdate, dateUpdate, userUpdate, openDetail, openSuc, index } = this.state
      console.log(this.state)
    return (
      <div className="dashboard-transaction text-center">
        <div className="pt-5">
            <h2 className="wow fadeInUp slow text-dark-smooth roboto-bold">Transaction</h2>
            <hr className="wow zoomIn slow dashboard-header-line"/>
            <div className="container mt-5">
                <h6 className="text-left text-dark-smooth roboto-medium">{this.today()}</h6>

                {data.map((datas, i) => {
                        var bilangan = datas.amount;
                    
                        var	number_string = bilangan.toString()
                        var sisa 	= number_string.length % 3
                        var rupiah 	= number_string.substr(0, sisa)
                        var ribuan 	= number_string.substr(sisa).match(/\d{3}/g)
                                
                        if (ribuan) {
                            let separator = sisa ? '.' : '';
                            rupiah += separator + ribuan.join('.');
                        }
                    return(
                    <div className="card p-4 my-2 rounded-md" onClick={() => this.handleOpenDetail(i)}>
                        <div className="row">
                            <div className="col-md-3 col-sm-12 text-md-left text-sm-center text-disable">
                                {datas.category}
                            </div>
                            <div className="col-md-3 col-sm-12 text-md-left text-sm-center text-dark-smooth">
                                IDR {rupiah}
                            </div>
                            <div className={datas.type === 'Income' ? "col-md-3 col-sm-12 text-md-left text-sm-center text-primary" : "col-md-3 col-sm-12 text-md-left text-sm-center text-danger" }>
                                {datas.type}
                            </div>
                            <div className="col-md-3 col-sm-12 text-md-right text-sm-center text-disable">
                                {datas.date}
                            </div>
                        </div>
                        <Ink/>
                    </div>
                    )}
                )}
            </div>
        </div>

        {/* Add */}
                <button className="btn-add btn-rounded" onClick={this.handleOpen}>
                      + Add
                </button>
        {/* Add */}

        {/* Add Transaction */}
        <Dialog
            maxWidth="xs"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title" className="mx-auto text-center">
                Add Transaction
            </DialogTitle>
            <DialogContent>
                <div>
                    {/* <form className="py-2"> */}

                        <TextField
                            select
                            className="w-100"
                            label="Type"
                            value={type}
                            onChange={this.handleChange('type')}
                            id="type"
                            InputProps={{
                            startAdornment: <InputAdornment position="start"><TypeIcon className="text-blue"/></InputAdornment>
                            }}
                        >
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            <MenuItem value={'Income'}>Income</MenuItem>
                            <MenuItem value={'Expense'}>Expense</MenuItem>
                        </TextField>

                        <TextField
                            select
                            className="w-100 mt-2"
                            label="Category"
                            value={category}
                            onChange={this.handleChange('category')}
                            id="category"
                            InputProps={{
                            startAdornment: <InputAdornment position="start"><CategoryIcon className="text-blue"/></InputAdornment>
                            }}
                        >
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            <MenuItem value={'Family'}>Family</MenuItem>
                            <MenuItem value={'Sport'}>Sport</MenuItem>
                            <MenuItem value={'Loan'}>Loan</MenuItem>
                        </TextField>

                        <TextField
                            number
                            className="w-100 mt-2"
                            label="How Much?"
                            value={amount}
                            onChange={this.handleChange('amount')}
                            id="amount"
                            InputProps={{
                            startAdornment: <InputAdornment position="start"><AmountIcon className="text-blue"/></InputAdornment>
                            }}
                        >
                        </TextField>

                        <TextField
                            number
                            className="w-100 mt-2"
                            label="Note"
                            value={note}
                            onChange={this.handleChange('note')}
                            id="note"
                            InputProps={{
                            startAdornment: <InputAdornment position="start"><NoteIcon className="text-blue"/></InputAdornment>
                            }}
                        >
                        </TextField>
                        
                        <TextField
                            type='date'
                            className="w-100 mt-2"
                            label="Date"
                            value={date}
                            onChange={this.handleChange('date')}
                            id="date"
                            InputProps={{
                            startAdornment: <InputAdornment position="start"><DateIcon className="text-blue"/></InputAdornment>
                            }}
                        >
                        </TextField>

                        <TextField
                            className="w-100 mt-2"
                            label="User"
                            value={user}
                            onChange={this.handleChange('user')}
                            id="user"
                            InputProps={{
                            startAdornment: <InputAdornment position="start"><Account className="text-blue"/></InputAdornment>
                            }}
                        >
                        </TextField>

                        <div className="mx-auto mt-4 d-flex justify-content-center">
                            <button className="btn-rounded mx-1 btn-send" type="button" onClick={this.handleAddTrans}>
                            Add
                            </button>
                            <button className="btn-rounded mx-1 btn-cancel" onClick={this.handleClose}>
                            Cancel
                            </button>
                        </div>
                    {/* </form> */}
                </div>
            </DialogContent>
        </Dialog>
        {/* Add Transaction */}

        {/* Detail Transaction */}
        <Dialog
            maxWidth="xs"
            open={openDetail}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleCloseDetail}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title" className="mx-auto text-center">
                Detail Transaction
            </DialogTitle>
            <DialogContent>
                <div>
                    {/* <form className="py-2"> */}

                        <TextField
                            select
                            className="w-100"
                            label="Type"
                            value={index === '' ? type : typeUpdate}
                            onChange={this.handleChange('typeUpdate')}
                            id="typeUpdate"
                            InputProps={{
                            startAdornment: <InputAdornment position="start"><TypeIcon className="text-blue"/></InputAdornment>
                            }}
                        >
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            <MenuItem value={'Income'}>Income</MenuItem>
                            <MenuItem value={'Expense'}>Expense</MenuItem>
                        </TextField>

                        <TextField
                            select
                            className="w-100 mt-2"
                            label="Category"
                            value={index === '' ? type : categoryUpdate}
                            onChange={this.handleChange('categoryUpdate')}
                            id="categoryUpdate"
                            InputProps={{
                            startAdornment: <InputAdornment position="start"><CategoryIcon className="text-blue"/></InputAdornment>
                            }}
                        >
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            <MenuItem value={'Family'}>Family</MenuItem>
                            <MenuItem value={'Sport'}>Sport</MenuItem>
                            <MenuItem value={'Gift'}>Gift</MenuItem>
                            <MenuItem value={'Loan'}>Loan</MenuItem>
                        </TextField>

                        <TextField
                            number
                            className="w-100 mt-2"
                            label="How Much?"
                            value={index === '' ? type : amountUpdate}
                            onChange={this.handleChange('amountUpdate')}
                            id="amountUpdate"
                            InputProps={{
                            startAdornment: <InputAdornment position="start"><AmountIcon className="text-blue"/></InputAdornment>
                            }}
                        >
                        </TextField>

                        <TextField
                            number
                            className="w-100 mt-2"
                            label="note"
                            value={index === '' ? type : noteUpdate}
                            onChange={this.handleChange('noteUpdate')}
                            id="noteUpdate"
                            InputProps={{
                            startAdornment: <InputAdornment position="start"><NoteIcon className="text-blue"/></InputAdornment>
                            }}
                        >
                        </TextField>
                        
                        <TextField
                            type='date'
                            className="w-100 mt-2"
                            label="Date"
                            value={index === '' ? type : dateUpdate}
                            onChange={this.handleChange('dateUpdate')}
                            id="dateUpdate"
                            InputProps={{
                            startAdornment: <InputAdornment position="start"><DateIcon className="text-blue"/></InputAdornment>
                            }}
                        >
                        </TextField>

                        <TextField
                            className="w-100 mt-2"
                            label="User"
                            value={index === '' ? type : userUpdate}
                            onChange={this.handleChange('userUpdate')}
                            id="userUpdate"
                            InputProps={{
                            startAdornment: <InputAdornment position="start"><Account className="text-blue"/></InputAdornment>
                            }}
                        >
                        </TextField>

                        <div className="mx-auto mt-4 d-flex justify-content-center">
                            <button className="btn-rounded mx-1 btn-send" type="button" onClick={this.handleCloseDetail}>
                            Save
                            </button>
                            <button className="btn-rounded mx-1 btn-cancel" onClick={this.handleCloseDetail}>
                            Cancel
                            </button>
                        </div>
                    {/* </form> */}
                </div>
            </DialogContent>
        </Dialog>
        {/* Detail Transaction */}

        {/* OnSuccess Push */}
        <Snackbar
            anchorOrigin={{vertical:'bottom', horizontal:'center'}}
            open={openSuc}
            onClose={this.handleCloseSuc}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={ <p id='message-id'>Transaction Added</p> }
        />
      </div>
    )
  }
}