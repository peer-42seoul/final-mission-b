package com.peer.missionpeerflow.util;

import javax.persistence.AttributeConverter;

public class CategoryAttributeConverter implements AttributeConverter<Category, Integer> {

	@Override
	public Integer convertToDatabaseColumn(Category category) {
		return category.getCode();
	}

	@Override
	public Category convertToEntityAttribute(Integer code) {
		return Category.ofCode(code);
	}
}
