/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as React from "react";

import { Intent, ProgressBar, Slider, Switch } from "@blueprintjs/core";
import { BaseExample, handleBooleanChange, handleNumberChange } from "@blueprintjs/docs";
import { IntentSelect } from "./common/intentSelect";

export interface IProgressExampleState {
    className?: string;
    hasValue?: boolean;
    intent?: Intent;
    value?: number;
}

export class ProgressExample extends BaseExample<IProgressExampleState> {
    public state: IProgressExampleState = {
        hasValue: false,
        value: 0.7,
    };

    protected className = "docs-progress-example";

    private handleIndeterminateChange = handleBooleanChange(hasValue => this.setState({ hasValue }));
    private handleModifierChange = handleNumberChange(intent => this.setState({ intent }));

    protected renderExample() {
        const { hasValue, intent, value } = this.state;
        return <ProgressBar intent={intent} value={hasValue ? value : null} />;
    }

    protected renderOptions() {
        return [
            [
                <Switch
                    checked={this.state.hasValue}
                    key="has-value"
                    label="Known Value"
                    onChange={this.handleIndeterminateChange}
                />,
                <Slider
                    disabled={!this.state.hasValue}
                    key="value"
                    labelStepSize={1}
                    min={0}
                    max={1}
                    onChange={this.handleValueChange}
                    labelRenderer={this.labelRenderer}
                    stepSize={0.1}
                    showTrackFill={false}
                    value={this.state.value}
                />,
                <IntentSelect intent={this.state.intent} key="intent" onChange={this.handleModifierChange} />,
            ],
        ];
    }

    private labelRenderer = (value: number) => value.toFixed(1);

    private handleValueChange = (value: number) => this.setState({ value });
}
