import React, { Component } from 'react'

import Select from 'react-select'

import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

import { pull } from 'lodash'

import { queryStringWithoutEmpty } from '../lib/searchQuery'

import { withRouter } from 'next/router'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props.query }
  }

  onReactSelect = (selected, label) => {
    this.setState(
      {
        [`${label}`]: selected.map(val => val.value)
      },
      () => {
        if (!this.props.homePage) {
          const redirectObj = {
            pathname: `/`,
            query: queryStringWithoutEmpty({
              ...this.state
            })
          }
          this.props.router.push(redirectObj, redirectObj, { shallow: true })
        }
      }
    )
  }

  onPriceChange = e => {
    const value = Number(e.target.value.replace(',', '').replace('£', ''))

    this.setState({ [e.target.name]: value === 0 ? '' : value }, () => {
      if (!this.props.homePage) {
        const redirectObj = {
          pathname: `/`,
          query: queryStringWithoutEmpty({
            ...this.state
          })
        }
        this.props.router.push(redirectObj, redirectObj, { shallow: true })
      }
    })
  }

  checkBoxChange = (e, label) => {
    const newValue = e.target.value
    const labelValue = this.state[label]

    if (e.target.checked) {
      labelValue.push(newValue)
    } else {
      pull(labelValue, newValue)
    }

    this.setState({ [label]: labelValue }, () => {
      if (!this.props.homePage) {
        const redirectObj = {
          pathname: `/`,
          query: queryStringWithoutEmpty({
            ...this.state
          })
        }
        this.props.router.push(redirectObj, redirectObj, { shallow: true })
      }
    })
  }

  render () {
    const currencyMask = createNumberMask({
      prefix: '£',
      integerLimit: 5
    })

    return (
      <div>
        <form>
          <h1>BASIC SEARCH</h1>
          <div
            style={{
              border: '1px solid black',
              margin: '1rem 0 1rem 0',
              padding: '1rem'
            }}
          >
            <label>Brand:</label>
            <div style={{ paddingTop: '0.5rem' }}>
              <Select
                isMulti
                name='brand'
                instanceId='brand'
                options={[
                  { value: 'GM', label: 'GM' },
                  { value: 'ATT', label: 'ATT' }
                ]}
                onChange={selected => this.onReactSelect(selected, 'brand')}
                value={this.state.brand.map(val => ({
                  value: val,
                  label: val
                }))}
              />
            </div>
          </div>
          <div
            style={{
              border: '1px solid black',
              margin: '1rem 0 1rem 0',
              padding: '1rem'
            }}
          >
            <label>Manufacturer:</label>
            <div>
              {['Apple', 'Microsoft', 'Google'].map(val => {
                return (
                  <div key={val}>
                    <label>
                      {val}
                      <input
                        type='checkbox'
                        value={val}
                        onChange={e => this.checkBoxChange(e, 'manufacturer')}
                        checked={this.state.manufacturer.includes(val)}
                      />
                    </label>
                  </div>
                )
              })}
            </div>
          </div>
          <div
            style={{
              border: '1px solid black',
              margin: '1rem 0 1rem 0',
              padding: '1rem'
            }}
          >
            <label>Price:</label>
            <div>
              <MaskedInput
                mask={currencyMask}
                placeholder='Enter a min. price'
                className='mInput'
                name='lowPrice'
                value={this.state.lowPrice ? this.state.lowPrice : ''}
                onChange={this.onPriceChange}
              />
              <MaskedInput
                mask={currencyMask}
                placeholder='Enter a max. price'
                className='mInput'
                name='highPrice'
                value={this.state.highPrice ? this.state.highPrice : ''}
                onChange={this.onPriceChange}
              />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(Search)
