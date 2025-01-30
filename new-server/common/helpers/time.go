package helpers

import (
	"errors"
	"time"
)

const DateTimeFormat = "2006-01-02 15:04:05"

// Ugly name as fuck.
func ParseToDBDate(date time.Time) (string, error) {

	if date.IsZero() {
		return "", errors.New("need to provide a date to format.")
	}

	return date.Format(DateTimeFormat), nil
}
