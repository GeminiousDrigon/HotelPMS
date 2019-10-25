import React, { Component, PureComponent } from "react";
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'

export default class IconsItem extends PureComponent {
  onClick= () => {
    this.props.onSelectIcon(this.props.value)
  }
  
    render() {
      let {value} = this.props
        return (
            <Paper
                style={{
                    height: 80,
                    width: 80,
                    display: "inline-block",
                    // border: "0.5px solid black",
                    textAlign: "center",
                    cursor: "pointer"
                }}
                square
                elevation={0}
                key={value}
                onClick={this.onClick}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        flexDirection: "column",
                        height: "100%"
                    }}
                >
                    <Icon fontSize="large">{value}</Icon>
                </div>
            </Paper>
        );
    }
}
