import React, { Component } from 'react'
import './transaction.css'
import typeListData from './type.json'
import WOW from 'wowjs'
import Ink from 'react-ink'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide, InputAdornment, MenuItem, TextField, Snackbar, LinearProgress, List, ListItem, ListItemText, Typography, Tabs, Tab, AppBar } from '@material-ui/core'
import 'react-infinite-calendar/styles.css'
import TypeIcon from '@material-ui/icons/MonetizationOn'
import CategoryIcon from '@material-ui/icons/Apps'
import AmountIcon from '@material-ui/icons/AttachMoney'
import NoteIcon from '@material-ui/icons/Create'
import DateIcon from '@material-ui/icons/DateRange'
import Account from '@material-ui/icons/AccountCircle'
import Close from '@material-ui/icons/Close'
import axios from 'axios'
import { css } from 'react-emotion'
import { HashLoader } from 'react-spinners'


const override = css`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

export default class index extends Component {
    state = {
        data: '',
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
        typeList: typeListData,
        categoryList: '',
        loading: false,
        open: false,
        openType: false,
        openDetail: false,
        openSuc: false,
        openFail: false,
        index: '',
        token: '',
        value: 0,
        url: 'https://api-simplewallet-v1.herokuapp.com/api/v1',
    }

    getData = () => {
        const { url } = this.state
        axios.get(`${url}/transactions`)
        .then(res => {
            console.log(res)
            this.setState({ data: res.data.data })
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    getCategory = () => {
        const { url } = this.state
        axios.get(`${url}/category`)
        .then(res => {
            console.log(res)
            this.setState({
                categoryList: res.data
            })
        })
    }

    componentDidMount() {
        new WOW.WOW().init()
        this.setState({ token: localStorage.getItem('token') })
        this.getData()
        this.getCategory()
    }

    today = () => {
        var today = new Date()
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear()
    }

    handleClose = () => {
        this.setState({ open: false, })
    }

    handleOpen = () => {
        this.setState({ open: true, })
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value })
      }

    handleDateChange = (date) => {
        this.setState({ date })
    }

    handleCloseDetail = () => {
        this.setState({ openDetail: false, })
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
            categoryUpdate: datas[i].category_id,
            amountUpdate: datas[i].amount,
            noteUpdate: datas[i].note,
            dateUpdate: datas[i].date,
            userUpdate: datas[i].user,
        })
    }

    handleAdd = (e) => {
        e.preventDefault()

        this.setState({ loading: true })

        const { token, url } = this.state
        let data = new FormData()
        data.append('type', this.state.type.toLowerCase())
        data.append('category_id', this.state.category)
        data.append('amount', this.state.type === 'Expense' ? '-' + parseInt(this.state.amount) : parseInt(this.state.amount))
        data.append('note', this.state.note)
        data.append('date', this.state.date)
        data.append('user', this.state.user)

        axios.post(`${url}/transactions?token=${token}`, data).then(res => {
            console.log(res)
            this.setState({
                type: '',
                category: '',
                amount: '',
                note: '',
                date: '',
                user: '',
                open: false,
                openSuc: true,
                loading: false,
            })
            this.getData()
        }).catch(err => {
            console.log(err)
            this.setState({
                open: false,
                loading: false,
                openFail: true,
            })
        })
    }

    closeFail = () => {
        this.setState({ openFail: false, })
    }

    showType = () => {
        this.setState({ openType: true })
    }

    handleTypeListClick = (e) => {
        this.setState({
            typeUpdate: e.target.innerHTML,
            openType: false,
        })
    }

    handleCloseType = () => {
        this.setState({ openType: false })
    }

    handleSwipe = (e, value) => {
        this.setState({ value })
    }

  render() {
      const { data, open, type, category, amount, note, date, user, typeUpdate, categoryUpdate, amountUpdate, noteUpdate, dateUpdate, userUpdate, typeList, categoryList, openType, openDetail, openSuc, index, loading, openFail, value } = this.state
      console.log(this.state)
    if(data === '' || data === undefined || categoryList === '' || categoryList === undefined) {
    return(
        <div className="preload">
            <div className="sweet-loading mx-auto">
                <HashLoader
                    className={override}
                    sizeUnit={"px"}
                    size={75}
                    color={"#1eb8fb"}
                    loading={true}
                />
            </div>
        </div>
    )
    }
    return (
      <div className="dashboard-transaction text-center">
        <div className="pt-5">
            <h2 className="wow fadeInUp slow text-dark-smooth roboto-bold">Transaction</h2>
            <hr className="wow zoomIn slow dashboard-header-line"/>
            <div className="container mt-5">
                <h6 className="text-left text-dark-smooth roboto-medium">{this.today()}</h6>

                {categoryList === '' || categoryList === undefined ? categoryList : data.map((datas, i) => {
                        var bilangan = eval(datas.amount);
                    
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
                                {datas.note}
                            </div>
                            <div className="col-md-3 col-sm-12 text-md-left text-sm-center text-dark-smooth">
                                IDR {rupiah}
                            </div>
                            <div className={datas.type === 'income' ? "col-md-3 col-sm-12 text-md-left text-sm-center text-primary" : "col-md-3 col-sm-12 text-md-left text-sm-center text-danger" }>
                                {datas.type.toUpperCase()}
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

        {/* Preload */}
        <div className={loading === true ? 'display' : 'd-none'}>
          <LinearProgress />
        </div>
        {/* Preload */}

        {/* Type */}
        <Dialog open={openType} onClose={this.handleCloseType} aria-labelledby="simple-dialog-title">
            <DialogTitle id="simple-dialog-title">Transaction Type</DialogTitle>
            <div>
            <List>
                {typeList.map(datas => (
                    <ListItem button>
                <ListItemText primary={datas.type} onClick={this.handleTypeListClick}/>
                </ListItem>
                ))}
            </List>
            </div>
        </Dialog>
        {/* Type */}

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
                    <form onSubmit={this.handleAdd}>
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

                        <AppBar position="static">
                        <Tabs value={value} onChange={this.handleSwipe}>
                            <Tab label="Expense" />
                            <Tab label="Income" />
                        </Tabs>
                        </AppBar>
                        {value === 0 && categoryList.map((datas, i) => {
                            if(i < 25) {
                            return (
                                <MenuItem value={datas.category_id}>{datas.name}</MenuItem>
                                )}
                            })}
                        {value === 1 && categoryList.map((datas, i) => {
                            if(i > 25) {
                            return (
                                <MenuItem value={datas.category_id}>{datas.name}</MenuItem>
                                )}
                            })}
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
                            <button className="btn-rounded mx-1 btn-send" type="submit">
                            Add
                            </button>
                            <button className="btn-rounded mx-1 btn-cancel" type="button" onClick={this.handleClose}>
                            Cancel
                            </button>
                        </div>
                    </form>
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
                            className="w-100"
                            label="Type"
                            value={index === '' ? type : typeUpdate}
                            onChange={this.handleChange('typeUpdate')}
                            onClick={this.showType}
                            id="typeUpdate"
                            InputProps={{
                            startAdornment: <InputAdornment position="start"><TypeIcon className="text-blue"/></InputAdornment>
                            }}
                        >
                        </TextField>

                        <TextField
                            select
                            className="w-100 mt-2"
                            label="Category"
                            value={index === '' ? 'none' : categoryUpdate}
                            onChange={this.handleChange('categoryUpdate')}
                            id="categoryUpdate"
                            InputProps={{
                            startAdornment: <InputAdornment position="start"><CategoryIcon className="text-blue"/></InputAdornment>
                            }}
                        >
                        {categoryList === '' ? categoryList : categoryList.map(datas => (
                                <MenuItem value={datas.category_id}>{datas.name}</MenuItem>
                                )
                            )
                        }
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
        {/* OnSuccess Push */}

        {/* If Failed */}
        <Dialog
            open={openFail}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.closeFail}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title" className="mx-auto text-center">
                Failed to add<br/>
            </DialogTitle>
            <DialogContent className="mx-auto mt-2 text-center">
                <div className="mx-auto">
                    <Close className="wow bounceIn text-danger" style={{fontSize: '100px'}}/>
                </div>
            </DialogContent>
            <DialogActions>
                <Button className="mx-auto" onClick={this.closeFail}>
                Close
                </Button>
            </DialogActions>
            </Dialog>
        {/* /If Failed */}
      </div>
    )
  }
}